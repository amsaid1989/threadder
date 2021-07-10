import { TWEET_LENGTH } from "./generalConstants";

export default function breakTextAtFullSentences(text) {
    /*
     * The main function of the module which will be used by
     * the tweet splitter module.
     */

    return combineSentencesIntoTweets(splitAtFullstops(text));
}

function trimTopAndTailSpaces(text) {
    /*
     * Removes any spaces or tab characters from the start and end of
     * a string. It is similar to the built-in trim() String method,
     * but it doesn't remove newline characters like the trim() method
     * does.
     */

    const startPattern = /^[ \t]*/;
    const endPattern = /[ \t]*$/;

    return text.replace(startPattern, "").replace(endPattern, "");
}

function splitAtFullstops(text) {
    /*
     * Takes a string that has multiple sentences ending in full stops
     * and splits it into an array of single sentences that each contain
     * the full stop at the end.
     *
     * It works by checking for any full stops that are followed by
     * a letter or a newline character because that would mean they are
     * at the middle of the string. It then splits the string at these
     * full stops, which removes them from the sentences, then rejoins
     * the whole string with a full stop followed by a space.
     *
     * Next, it splits the string again at any space character that is
     * preceded by a full stop. The result of this is that each sentence
     * would end up keeping its full stop.
     */

    const removeFullstopPattern = /\.(?=\s?[\w\n]+)/g;
    const removeSpacePattern = /(?<=\.)\s/g;

    return text
        .split(removeFullstopPattern)
        .filter((sentence) => sentence !== "")
        .join(". ")
        .split(removeSpacePattern)
        .map((sentence) => trimTopAndTailSpaces(sentence));
}

function combineSentencesIntoTweets(sentenceArray) {
    /*
     * Takes an array of sentences and iterates over it combining
     * the sentences into tweets that aren't longer than 280
     * characters. However, if one of the sentences is shorter than
     * 140, it will add the following sentence to it even if their
     * combined length is longer than 280. This is to avoid having
     * very short tweets unnecessarily. If the user wants to have
     * short tweets, they can force a split.
     *
     * Any tweets longer than 280 will be handled by further functions
     * that will eventually split them to fit the maximum character
     * count on Twitter.
     */

    // Return early if sentenceArray is empty
    if (sentenceArray.length === 0) {
        return [];
    }

    let outArray = [];

    for (let i = 0; i < sentenceArray.length; i++) {
        // Just add the first sentence to the output array
        if (i === 0) {
            outArray.push(sentenceArray[i]);

            continue;
        }

        // Get the last sentence that was added to the output array
        let lastSentence = outArray[outArray.length - 1];

        const curSentence = sentenceArray[i];

        if (
            lastSentence.length <= TWEET_LENGTH / 2 ||
            lastSentence.length + curSentence.length <= TWEET_LENGTH
        ) {
            lastSentence += ` ${curSentence}`;

            outArray[outArray.length - 1] = lastSentence;
        } else {
            outArray.push(sentenceArray[i]);
        }
    }

    return outArray;
}

export const fsHandler = {
    trimTopAndTailSpaces,
    splitAtFullstops,
    combineSentencesIntoTweets,
};