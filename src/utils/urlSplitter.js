import { TWEET_LENGTH } from "./generalConstants";
import charCheck from "./characterChecker";
import {
    splitAtFirstFullstopOrNewline,
    splitAtLastFullstopOrNewline,
} from "./fullSentenceSplitter";

const urlPattern =
    /((?:https?:\/\/|www.){1}[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*))/;

export function isURL(text) {
    /**
     * Checks a string against the URL regex pattern and returns
     * a true if the text includes a URL, or false otherwise.
     */

    return urlPattern.test(text);
}

export function detectAndSplitURLs(text) {
    /**
     * If input text includes one or more URLs, return an array
     * that has each of the URLs as a separate item, with text
     * before and after the URL split as the items surrouning it,
     * and remove any empty items that may result from the split.
     *
     * If the text doesn't include any URLs, then return the
     * full text as the single item of an array.
     */

    return text.split(urlPattern).filter((item) => item !== "");
}

export function rejoinURLsIntoTweets(threadArray) {
    /**
     * Goes over an array of tweets and rejoins any URLs that
     * were previously split and rejoins them to their original
     * tweets.
     *
     * If adding the URL to the tweet will make the text too
     * long to fit in a single tweet, then attempt to split
     * the last sentence of the tweet and add the URL to it
     * instead.
     */

    let out = [];

    for (let i = 0; i < threadArray.length; i++) {
        // Get the last item that was added to the output array
        // along with its index
        const lastIndex = out.length - 1;
        const lastTweetAdded = out[lastIndex];

        const currentTweet = threadArray[i];

        if (
            i === 0 ||
            (i > 0 &&
                !isURL(currentTweet) &&
                !isURL(lastTweetAdded) &&
                lastTweetAdded.length > TWEET_LENGTH / 4)
        ) {
            out.push(currentTweet);
            continue;
        } else if (isURL(currentTweet)) {
            /**
             * This checks if the current tweet contains a URL,
             * then attempts to rejoin it to the last tweet
             * added to the thread. If the result is going to be
             * longer than a single tweet length, then it separates
             * the last sentence of the last tweet and joins it
             * with the current one.
             */

            if (lastTweetAdded.length + currentTweet.length > TWEET_LENGTH) {
                out = [
                    ...out.slice(0, lastIndex),
                    ...splitAtLastFullstopOrNewline(lastTweetAdded),
                ];
            }

            const lastTweet = out[out.length - 1];

            // Replace the last tweet in the output array with the
            // result of joining the current tweet to the last
            // one added to the array.
            out[out.length - 1] = joinCurrentTweetToPrevious(
                currentTweet,
                lastTweet
            );
        } else {
            /**
             * If the current tweet doesn't contain a URL, but the
             * previous one does, then attempt to join the current
             * one to the previous. If the result is going to be
             * longer than a single tweet length, then separate the
             * first sentence of the current tweet and add it to the
             * previous one, then push the remaining sentences to the
             * output array.
             */

            let first = currentTweet;
            let rest = [];

            if (lastTweetAdded.length + currentTweet.length > TWEET_LENGTH) {
                [first, ...rest] = splitAtFirstFullstopOrNewline(currentTweet);
            }

            const lastTweet = out[out.length - 1];

            // Replace the last tweet in the output array with the
            // result of joining the current tweet to the last
            // one added to the array.
            out[out.length - 1] = joinCurrentTweetToPrevious(first, lastTweet);

            out = [...out, ...rest];
        }
    }

    return out;
}

function joinCurrentTweetToPrevious(currentTweet, previousTweet) {
    /**
     * Helper function that determines how 2 tweets are joined together
     * based on the last character of the previous tweet and the first
     * character of the current tweet.
     *
     * It is used by the rejoinURLsIntoTweets function when it attempts
     * to join a URL to either the tweet that preceded it or the one
     * that succeeded it.
     *
     * If the previous tweet ends with a character that should be followed
     * by a space, then a space is added. Otherwise, the 2 tweets will
     * be joined without a space in between.
     *
     * If the current tweet begins with a character that shouldn't be
     * preceded by a space, then no space will be added.
     */

    const lastTwoCharsInPrevTweet = previousTweet.slice(
        previousTweet.length - 2
    );
    const firstCharacterInCurrentTweet = currentTweet[0];

    /* DEFINE TESTS */
    const bothAlphaNumeric =
        charCheck.isAlphaNumeric(lastTwoCharsInPrevTweet) &&
        charCheck.isAlphaNumeric(firstCharacterInCurrentTweet);

    // Checks if the previous tweet ends with a non-word character
    // that is not preceded by a space and that the first character
    // of the current tweet is alphanumeric
    const prevNonWordNoSpaceBefore =
        charCheck.isNonWordWithoutSpaceBefore(lastTwoCharsInPrevTweet) &&
        charCheck.isAlphaNumeric(firstCharacterInCurrentTweet);
    /* END DEFINE TESTS */

    if (bothAlphaNumeric || prevNonWordNoSpaceBefore) {
        return `${previousTweet} ${currentTweet}`;
    } else {
        return previousTweet + currentTweet;
    }
}

// Exported for testing purposes
export const urlSplitter = {
    joinCurrentTweetToPrevious,
};
