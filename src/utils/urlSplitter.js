import { TWEET_LENGTH } from "./generalConstants";
import { splitAtLastFullstopOrNewline } from "./fullSentenceSplitter";

const urlPattern =
    /((?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*))/;

export function isURL(text) {
    /*
        Checks a string against the URL regex pattern and returns
        a true if the text includes a URL, or false otherwise.
    */

    return urlPattern.test(text);
}

export function detectAndSplitURLs(text) {
    /*
        If input text includes one or more URLs, return an array
        that has each of the URLs as a separate item, with text
        before and after the URL split as the items surrouning it,
        and remove any empty items that may result from the split.

        If the text doesn't include any URLs, then return the
        full text as the single item of an array.
    */

    return text.split(urlPattern).filter((item) => item !== "");
}

export function rejoinURLsIntoTweets(threadArray) {
    /*
        Goes over an array of tweets and rejoins any URLs that
        were previously split and rejoins them to their original
        tweets.

        If adding the URL to the tweet will make the text too
        long to fit in a single tweet, then attempt to split
        the last sentence of the tweet and add the URL to it
        instead.
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
            (i > 0 && !isURL(currentTweet) && !isURL(lastTweetAdded))
        ) {
            out.push(currentTweet);
            continue;
        } else if (
            isURL(currentTweet) &&
            lastTweetAdded.length + currentTweet.length > TWEET_LENGTH
        ) {
            out = [
                ...out.slice(0, lastIndex),
                ...splitAtLastFullstopOrNewline(lastTweetAdded),
            ];
        }

        const nonWordCharacterPattern = /\W/;
        const firstCharacterInCurrentTweet = currentTweet[0];

        if (nonWordCharacterPattern.test(firstCharacterInCurrentTweet)) {
            out[out.length - 1] += currentTweet;
        } else {
            out[out.length - 1] += ` ${currentTweet}`;
        }
    }

    return out;
}
