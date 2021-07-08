const TWEET_LENGTH = 280;

export default function splitTweet(thread) {
    // First, take care of user-defined splits
    const userDefinedSplits = thread.split("(---)");

    // Return early if all tweets are shorter than the maximum allowed
    // tweet length
    if (userDefinedSplits.every((tweet) => tweet.length < TWEET_LENGTH)) {
        // Make sure all tweets don't have any extra spaces at the start
        // or at the end
        return userDefinedSplits.map((tweet) => tweet.trim());
    }

    // Second, split the tweet at full sentences that fit within a tweet
    const fullSentencesSplit = userDefinedSplits
        .map((tweet) => {
            if (tweet.length < TWEET_LENGTH) {
                return tweet;
            }

            return breakTweetAtFullstops(tweet);
        })
        .flat();

    // Return early if all tweets are shorter than the maximum allowed
    // tweet length
    if (fullSentencesSplit.every((tweet) => tweet.length < TWEET_LENGTH)) {
        return fullSentencesSplit;
    }

    // Last, split any tweets that are still longer than the maximum
    // allowed tweet length
    const output = fullSentencesSplit
        .map((tweet) => {
            if (tweet.length < TWEET_LENGTH) {
                return tweet;
            }

            return breakLongTweet(tweet);
        })
        .flat();

    // Remove ellipsis from the last tweet in the thread
    const lastTweetIndex = output.length - 1;
    const lastTweet = output[lastTweetIndex];
    const lastThreeCharacters = lastTweet.slice(lastTweet.length - 3);

    if (lastThreeCharacters === "...") {
        output[lastTweetIndex] = lastTweet.slice(0, lastTweet.length - 3);
    }

    return output;
}

function breakVeryLongWord(word) {
    /*
     * Function that takes any word longer than the maximum character
     * count allowed for Twitter and splits it into several tweets.
     * This allows the app to handle user input if the user decides to
     * type long strings with no spaces in between.
     */

    // Define a tweet length that is 3 characters shorter than the maximum
    // length allowed by Twitter because the function will add ellipsis (...)
    // to the end of the tweet to indicate that this tweet is breaking a word
    // in the middle
    const localTweetLength = TWEET_LENGTH - 3;

    // Get how many tweets are needed to include the entire word
    const tweetCount = Math.ceil(word.length / localTweetLength);

    let splitTweets = [];

    for (let i = 0; i < tweetCount; i++) {
        const sliceStart = i * localTweetLength;
        const sliceEnd = (i + 1) * localTweetLength;

        let outWord = word.slice(sliceStart, sliceEnd);

        // If the sliced word is not at the end of the input word,
        // add ellipsis (...)
        if (i + 1 !== tweetCount) {
            outWord += "...";
        }

        splitTweets.push(outWord);
    }

    return splitTweets;
}

// TODO: Figure this function out because it is not working properly.
// It should split all the sentences that can fit within a tweet even
// if there are sentences in between that won't fit. The sentences that
// won't fit should still be added to the output array, but they will
// be handled later and split further so they fit in a series of tweets
function breakTweetAtFullstops(tweet) {
    /*
     * A function that takes a tweet that is longer than 280 characters
     * and splits it into an array of tweets at full sentences, where the
     * length each tweet is less than or equal to 280
     */

    // Get the number of tweets needed to fit the entire input text
    const tweetCount = Math.ceil(tweet.length / TWEET_LENGTH);

    // Find all full stops in the text and convert the matches object
    // into an array
    const matches = Array.from(tweet.matchAll(/\./g));

    if (matches.length === 0) {
        return [tweet];
    }

    // A variable that will be updated with the index of the last full
    // stop where the text was split
    let prevSplitIndex = 0;

    // The output array
    let splitTweets = [];

    for (let i = 0; i < tweetCount; i++) {
        // Get the index in the input text where the current tweet should
        // end. For example, for the first tweet, it would be equal to
        // 1 * 280 which is 280. For the second one, it would be equal to
        // 2 * 280 which is 560.
        const tweetEndIndex = (i + 1) * TWEET_LENGTH;

        // Get the greatest index that is less than the tweetEndIndex
        const splitIndex =
            matches
                .map((match) => match.index)
                .filter((index) => index <= tweetEndIndex)
                .pop() + 1;

        // If the rest of the text doesn't have any more full stops, add
        // the rest of the text to the output array as it is and break
        // out of the loop
        if (!(splitIndex > prevSplitIndex)) {
            splitTweets.push(tweet.slice(prevSplitIndex).trim());

            break;
        }

        const outTweet = tweet.slice(prevSplitIndex, splitIndex).trim();

        splitTweets.push(outTweet);

        // Update the prevSplitIndex with the current splitIndex
        prevSplitIndex = splitIndex;
    }

    return splitTweets;
}

function breakLongTweet(tweet) {
    /*
     * A function that takes a tweet that is longer than the maximum character
     * count allowed by Twitter and breaks it into an array of tweets that are
     * all less than or equal to the maximum character count.
     */

    // Split the tweet into separate words
    const splitWords = tweet.split(" ");

    // A variable that will be used to build a tweet of a length less than or
    // equal to the maximum character count allowed by Twitter. This tweet will
    // then be pushed to the output array of the split tweets, and the variable
    // will be cleared for the next tweet
    let currentTweet = "";

    // The output array
    let splitTweets = [];

    const localTweetLength = TWEET_LENGTH - 3;

    for (const word of splitWords) {
        // Ensure that the word is clear of any extra spaces
        const currentWord = word.trim();

        if (currentWord.length === 0) {
            continue;
        } else if (currentWord.length > TWEET_LENGTH) {
            if (currentTweet.length > 0) {
                // If we encounter a word that needs to be broken into separate
                // tweets, then we push any text in the currentTweet variable to
                // the output array and clear the variable
                splitTweets.push(currentTweet);
                currentTweet = "";
            }

            splitTweets = [...splitTweets, ...breakVeryLongWord(currentWord)];

            continue;
        }

        if (currentTweet.length === 0) {
            // When there is no text in the currentTweet variable, don't add
            // a space before adding the currentWord
            currentTweet += currentWord;
        } else if (
            currentTweet.length + currentWord.length + 1 <
            localTweetLength
        ) {
            currentTweet += ` ${currentWord}`;
        } else {
            splitTweets.push(`${currentTweet}...`);

            currentTweet = currentWord;
        }
    }

    // If there is any text left over in the currentTweet that hasn't been
    // pushed yet to the output array, push it
    if (currentTweet.length > 0) {
        splitTweets.push(`${currentTweet}...`);
    }

    return splitTweets;
}
