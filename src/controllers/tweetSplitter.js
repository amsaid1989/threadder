import { TWEET_LENGTH } from "../utils/generalConstants";
import breakTextAtFullSentences from "../utils/fullSentenceSplitter";
import {
    breakLongSentence,
    recombineShortTweets,
} from "../utils/midSentenceSplitter";
import {
    isURL,
    detectAndSplitURLs,
    rejoinURLsIntoTweets,
} from "../utils/urlSplitter";

export default function splitTweet(thread) {
    const cleanedThread = thread.trim();

    // First, take care of user-defined splits
    const userDefinedSplits = cleanedThread
        .split("(---)")
        .map((tweet) => tweet.trim())
        .filter((tweet) => tweet !== "");

    // Return early if all tweets are shorter than the maximum allowed
    // tweet length
    if (allTweetsFitLength(userDefinedSplits)) {
        return userDefinedSplits;
    }

    // Second, split any URLs in the text, so they are protected from
    // being broken down
    const splitAtURLs = userDefinedSplits
        .map((tweet) => detectAndSplitURLs(tweet))
        .flat()
        .map((tweet) => tweet.trim());

    // TODO: Add a step to shorten the URLs

    // Third, split the tweet at full sentences that fit within a tweet
    let fullSentencesSplit = splitAtURLs
        .map((tweet, index, arr) => {
            // If the length of the current tweet fits with a single tweet
            // and it is the last tweet in the array, or the next tweet is
            // not a URL, or if the current tweet itself is a URL, then do
            // not attempt to split it at full sentences
            if (
                (tweet.length <= TWEET_LENGTH && !arr[index + 1]) ||
                (tweet.length <= TWEET_LENGTH && !isURL(arr[index + 1])) ||
                isURL(tweet)
            ) {
                return tweet;
            }

            return breakTextAtFullSentences(tweet);
        })
        .flat()
        .map((tweet) => tweet.trim());

    // If the thread has any tweets that include URLs, which would
    // have been split earlier, then rejoin them into the tweets
    if (fullSentencesSplit.some((tweet) => isURL(tweet))) {
        fullSentencesSplit = rejoinURLsIntoTweets(fullSentencesSplit)
            .flat()
            .map((tweet) => tweet.trim());
    }

    // Return early if all tweets are shorter than the maximum allowed
    // tweet length
    if (allTweetsFitLength(fullSentencesSplit)) {
        return fullSentencesSplit;
    }

    // Next, split any tweets that are still longer than the maximum
    // allowed tweet length
    const midSentenceSplit = fullSentencesSplit
        .map((tweet) => {
            if (tweet.length <= TWEET_LENGTH) {
                return tweet;
            }

            return breakLongSentence(tweet);
        })
        .flat()
        .map((tweet) => tweet.trim());

    // Last, do a final pass going over the thread recombining any
    // tweets that are too short
    const output = recombineShortTweets(midSentenceSplit)
        .flat()
        .map((tweet) => tweet.trim());

    return output;
}

function allTweetsFitLength(threadArray) {
    /**
     * Utility function that makes sure that the length of every tweet
     * in an array is less than or equal to the defined tweet length
     */

    return threadArray.every((tweet) => tweet.length <= TWEET_LENGTH);
}
