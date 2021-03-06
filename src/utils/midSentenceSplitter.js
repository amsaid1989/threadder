import { TWEET_LENGTH } from "./generalConstants";

export function breakLongSentence(sentence) {
    /**
     * Takes a tweet that is longer than the maximum character
     * count allowed by Twitter and breaks it into an array of tweets that are
     * all less than or equal to the maximum character count.
     */

    if (sentence.length <= TWEET_LENGTH) {
        return sentence;
    }

    // Define a tweet length that is 3 characters shorter than the maximum
    // length allowed by Twitter because the function will add ellipsis "..."
    // to the end of the tweet to indicate that this tweet is breaking a
    // sentence in the middle
    const localTweetLength = TWEET_LENGTH - 3;

    // Split the tweet into separate words and remove any empty elements from
    // the array
    const splitWords = sentence.split(" ").filter((word) => word.length !== 0);

    // A variable that will be used to build a tweet of a length less than or
    // equal to the localTweetLength. This tweet will then be pushed to the
    // output array of the split tweets, and the variable will be cleared for
    // the next tweet
    let currentTweet = "";

    // The output array
    let splitTweets = [];

    for (const word of splitWords) {
        // Ensure that the word is clear of any extra spaces
        const currentWord = word.trim();

        // If we encounter a word that is longer than the tweet length so it
        // needs to be broken into separate tweets, then we push any text in
        // the currentTweet variable to the output array and clear the variable
        if (currentWord.length > TWEET_LENGTH) {
            if (currentTweet.length > 0) {
                splitTweets.push(`${currentTweet}...`);
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
        splitTweets.push(currentTweet);
    }

    // Remove ellipsis from the last tweet. The reason we remove the ellipsis
    // from the last tweet is that this function acts on complete sentences,
    // so the last tweet in the array is not part of any sentence that comes
    // after it. It is part of the thread, but it is not part of a broken
    // sentence, so it doesn't need the ellipsis
    const lastTweetIndex = splitTweets.length - 1;
    splitTweets[lastTweetIndex] = removeEllipsisFromTweet(
        splitTweets[lastTweetIndex]
    );

    return splitTweets;
}

export function recombineShortTweets(threadArray) {
    /**
     * Takes an array of tweets and iterates over it combining any
     * consecutive tweets that can fit in a single tweet
     */

    // The output array
    let combinedTweets = [];

    for (let i = 0; i < threadArray.length; i++) {
        const curTweet = threadArray[i];

        if (i === 0) {
            combinedTweets.push(curTweet);

            continue;
        }

        const lastTweetIndex = combinedTweets.length - 1;

        // Get the last tweet making sure to clean it from ellipsis
        // if it has them at the end to prepare it for the following
        // tweet to be added if they can fit together in a single tweet
        const lastTweet = removeEllipsisFromTweet(
            combinedTweets[lastTweetIndex]
        );

        if (lastTweet.length + curTweet.length + 1 <= TWEET_LENGTH) {
            // Replace the last tweet with the combination of last tweet
            // and the current tweet
            combinedTweets[lastTweetIndex] = `${lastTweet} ${curTweet}`;
        } else {
            combinedTweets.push(curTweet);
        }
    }

    return combinedTweets;
}

function breakVeryLongWord(word) {
    /**
     * Takes any word longer than the maximum character
     * count allowed for Twitter and splits it into several tweets.
     * This allows the app to handle user input if the user decides to
     * type long strings with no spaces in between.
     */

    if (word.length <= TWEET_LENGTH) {
        return word;
    }

    // Define a tweet length that is 3 characters shorter than the maximum
    // length allowed by Twitter because the function will add ellipsis "..."
    // to the end of the tweet to indicate that this tweet is breaking a word
    // in the middle
    const localTweetLength = TWEET_LENGTH - 3;

    // Get how many tweets are needed to include the entire word
    const tweetCount = Math.ceil(word.length / localTweetLength);

    let splitTweets = [];

    for (let i = 0; i < tweetCount; i++) {
        const sliceStart = i * localTweetLength;
        const sliceEnd = (i + 1) * localTweetLength;

        let outWord = word.slice(sliceStart, sliceEnd) + "...";

        splitTweets.push(outWord);
    }

    return splitTweets;
}

function removeEllipsisFromTweet(tweet) {
    /**
     * Removes the ellipsis from the end of a tweet
     */

    const lastThreeCharacters = tweet.slice(tweet.length - 3);

    if (lastThreeCharacters === "...") {
        return tweet.slice(0, tweet.length - 3);
    } else {
        return tweet;
    }
}

// Module functions exported mainly for testing purposes
export const msSplitter = {
    breakVeryLongWord,
    removeEllipsisFromTweet,
    recombineShortTweets,
};
