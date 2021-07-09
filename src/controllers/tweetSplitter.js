const TWEET_LENGTH = 280;

// TODO: The full algorithm needs thorough testing to see how it works on
// different inputs. One problematic area seems to be at the function that
// breaks the tweet at full stops, when lastIndex and lastSplitIndex are
// both equal to 0

export default function splitTweet(thread) {
    const cleanedThread = thread.trim();

    if (cleanedThread.length <= TWEET_LENGTH) {
        return [cleanedThread];
    }

    // First, take care of user-defined splits
    const userDefinedSplits = cleanedThread.split("(---)");

    // Return early if all tweets are shorter than the maximum allowed
    // tweet length
    if (userDefinedSplits.every((tweet) => tweet.length <= TWEET_LENGTH)) {
        // Make sure all tweets don't have any extra spaces at the start
        // or at the end
        return userDefinedSplits.map((tweet) => tweet.trim());
    }

    // Second, split the tweet at full sentences that fit within a tweet
    const fullSentencesSplit = userDefinedSplits
        .map((tweet) => {
            if (tweet.length <= TWEET_LENGTH) {
                return tweet;
            }

            return breakTweetAtFullstops(tweet);
        })
        .flat();

    // Return early if all tweets are shorter than the maximum allowed
    // tweet length
    if (fullSentencesSplit.every((tweet) => tweet.length <= TWEET_LENGTH)) {
        return fullSentencesSplit;
    }

    // Third, split any tweets longer than 280 at newline characters
    const returnSplit = fullSentencesSplit
        .map((tweet) => {
            if (tweet.length <= TWEET_LENGTH) {
                return tweet;
            }

            return breakTweetAtNewlines(tweet);
        })
        .flat();

    // Return early if all tweets are shorter than the maximum allowed
    // tweet length
    if (returnSplit.every((tweet) => tweet.length <= TWEET_LENGTH)) {
        return returnSplit;
    }

    // Last, split any tweets that are still longer than the maximum
    // allowed tweet length
    const output = returnSplit
        .map((tweet) => {
            if (tweet.length <= TWEET_LENGTH) {
                return tweet;
            }

            return breakLongTweet(tweet);
        })
        .flat();

    return output;
}

function breakTweetAtFullstops(tweet) {
    /*
     * A function that takes a tweet that is longer than 280 characters
     * and splits it into an array of tweets at full sentences, where the
     * length each tweet is less than or equal to 280
     */

    const matches = Array.from(tweet.matchAll(/\.\s/g));

    let lastSplitIndex = 0;
    let lastIndex = 0;

    let splitTweets = [];

    for (const match of matches) {
        if (match.index - lastSplitIndex > TWEET_LENGTH) {
            if (
                lastIndex > lastSplitIndex &&
                lastIndex - lastSplitIndex >= TWEET_LENGTH / 2
            ) {
                splitTweets.push(
                    tweet.slice(lastSplitIndex, lastIndex + 1).trim()
                );

                lastSplitIndex = lastIndex + 1;
            } else {
                splitTweets.push(
                    tweet.slice(lastSplitIndex, match.index + 1).trim()
                );

                lastSplitIndex = match.index + 1;
            }
        }

        lastIndex = match.index;
    }

    if (lastIndex > lastSplitIndex) {
        splitTweets.push(tweet.slice(lastSplitIndex).trim());
    }

    return splitTweets;
}

function breakTweetAtNewlines(tweet) {
    return tweet.split("\n").filter((tweet) => tweet !== "");
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

    const lastTweetIndex = splitTweets.length - 1;
    const lastTweet = splitTweets[lastTweetIndex];
    const lastThreeCharacters = lastTweet.slice(lastTweet.length - 3);

    if (lastThreeCharacters === "...") {
        splitTweets[lastTweetIndex] = lastTweet.slice(0, lastTweet.length - 3);
    }

    return splitTweets;
}
