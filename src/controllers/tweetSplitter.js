import { TWEET_LENGTH } from "../utils/generalConstants";
import breakTextAtFullSentences from "../utils/fullSentenceSplitter";
import breakLongSentence from "../utils/midSentenceSplitter";

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

    // Second, split the tweet at full sentences that fit within a tweet
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

    // Last, split any tweets that are still longer than the maximum
    // allowed tweet length
    const output = fullSentencesSplit
        .map((tweet) => {
            if (tweet.length <= TWEET_LENGTH) {
                return tweet;
            }

            return breakLongSentence(tweet);
        })
        .flat()
        .map((tweet) => tweet.trim());

    return output;
}

function allTweetsFitLength(threadArray) {
    return threadArray.every((tweet) => tweet.length <= TWEET_LENGTH);
}
