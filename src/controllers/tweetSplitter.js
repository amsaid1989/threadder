import { TWEET_LENGTH } from "../utils/generalConstants";
import breakTextAtFullSentences from "../utils/fullSentenceSplitter";
import {
    breakLongSentence,
    recombineShortTweets,
} from "../utils/midSentenceSplitter";

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

    // Third, split the tweet at full sentences if the tweet is longer
    // than the maximum length allowed
    const fullSentencesSplit = userDefinedSplits
        .map((tweet) => {
            if (tweet.length <= TWEET_LENGTH) {
                return tweet;
            }

            return breakTextAtFullSentences(tweet);
        })
        .flat()
        .map((tweet) => tweet.trim());

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
