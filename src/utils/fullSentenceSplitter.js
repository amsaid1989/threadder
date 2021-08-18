import { TWEET_LENGTH } from "./generalConstants";

export default function breakTextAtFullSentences(text) {
    /**
     * The main function of the module which will be used by
     * the tweet splitter module.
     */

    console.log(splitAtFullstops(text));
    console.log(combineSentencesIntoTweets(splitAtFullstops(text)));

    const fullSentenceSplit = combineSentencesIntoTweets(
        splitAtFullstops(text)
    );

    // Return early if all tweets are shorter than the maximum
    // character count allowed for tweets
    if (fullSentenceSplit.every((tweet) => tweet.length <= TWEET_LENGTH)) {
        return fullSentenceSplit;
    }

    // If there are tweets that are still longer than the maxmium
    // allowed character count, attempt to split these tweets
    // at newline characters, since a newline character is
    // usually an indication of a new sentence. However, make sure
    // that sentences aren't split into extermely short tweets
    // by recombining them
    const newlineSplit = combineSentencesIntoTweets(
        fullSentenceSplit
            .map((tweet) => {
                if (tweet.length <= TWEET_LENGTH) {
                    return tweet;
                }

                return breakTweetAtNewlines(tweet);
            })
            .flat()
            .map((tweet) => tweet.trim()),
        "\n"
    );

    return newlineSplit;
}

export function splitAtFirstFullstopOrNewline(text) {
    /**
     *  Splits the first sentence of a text made of multiple
     *  sentences split by fullstops or newlines.
     *
     *  Returns the split text as an array.
     */

    // Get the index of the first fullstop and the first newline
    // then use the least of them as the index of where to
    // split the text
    const firstFullstop = text.indexOf(". ");
    const firstNewline = text.indexOf("\n");

    const indexComparison = getSplitIndex(firstFullstop, firstNewline);

    const splitIndex = indexComparison === -1 ? text.length : indexComparison;

    return [text.slice(0, splitIndex).trim(), text.slice(splitIndex).trim()];
}

export function splitAtLastFullstopOrNewline(text) {
    /**
     * Splits the last sentence of a text made of multiple
     * sentences split by fullstops or newlines.
     *
     * Returns the split text as an array.
     */

    // Get the index of the last fullstop and the last newline
    // then use the greatest of them as the index of where to
    // split the text
    const lastFullstop = text.lastIndexOf(". ");
    const lastNewline = text.lastIndexOf("\n");

    const indexComparison = getSplitIndex(lastFullstop, lastNewline, true);

    const splitIndex = indexComparison === -1 ? text.length : indexComparison;

    return [text.slice(0, splitIndex).trim(), text.slice(splitIndex).trim()];
}

function getSplitIndex(a, b, last = false) {
    /**
     * Compares two indices. If the two are less than 0,
     * then it returns -1. If only one is less than 0,
     * then it returns the other one.
     *
     * If both are greater than 0, then it relies on the
     * last argument. If it is false, then it returns the
     * smaller of the two. If last is true, then it returns
     * the greater of the two.
     */

    if (a > 0 || b > 0) {
        if (
            b < 0 ||
            (last && a > 0 && b > 0 && a > b) ||
            (!last && a > 0 && b > 0 && a < b)
        ) {
            return a + 1;
        } else if (
            a < 0 ||
            (last && a > 0 && b > 0 && b > a) ||
            (!last && a > 0 && b > 0 && b < a)
        ) {
            return b + 1;
        }
    } else {
        return -1;
    }
}

function addFullstopAtEnd(sentence) {
    /**
     * Helper function that appends a full stop to the end of the sentence
     * provided.
     */

    return `${sentence}.`;
}

function trimTopAndTailSpaces(text) {
    /**
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
    /**
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

    /**
     * Let's break this regex pattern down to clarify what it does exactly.
     *
     * The pattern is actually 2 patterns combined as alternatives.
     *
     * The first one is this:
     * (?<!\svs?)(?<=\s\w+[a-zA-Z]+)\.(?=\s*[a-zA-Z]+\w*)
     *
     * (?<!\svs?)
     * It starts with a negative lookbehind that ensures the full stop
     * is not preceded by the abbreviations 'v' or 'vs' for versus. This
     * is to avoid splitting the sentence at the abbreviation since it
     * almost always comes mid-sentence.
     *
     * (?<=\s\w+[a-zA-Z]+)
     * Then, we have a positive lookbehind that makes sure the full stop
     * is preceded by a string of text that is made of at least 1 alphabetical
     * character and 1 word character (a-zA-Z0-9_). This is to avoid splitting
     * sentences when initials are encountered. For instance, Abdelrahman
     * M. Said shouldn't be split after the M. It also ensure that the last
     * character before the full stop is alphabetical. This is to avoid
     * splitting at points that separate currencies which have no symbol,
     * and uses alphabetical letters instead. For example, EGP4.5M, won't be
     * split, because the last character before the full stop is a digit.
     *
     * \.
     * Next, we have the pattern that matches the full stop character.
     *
     * (?=\s*[a-zA-Z]+\w*)
     * And lastly, for the first pattern, we have a positive lookahead which
     * ensures that the full stop is succeeded by at least 1 alphabetical
     * character that comes immediately after it. It will also match any
     * length of word or non-word characters that follow the alphabetical
     * one.
     *
     *
     * The second alternative is this:
     * (?<=\d+[\s./-]\d+|\s\d+)\.(?=\s*\W*[a-zA-Z]+\w*\W*)
     *
     * (?<=\d+[\s./-]\d+|\s\d+)
     * This one starts with a positive lookbehind that looks for either
     * a string of digits that is at least 1 digit long and that is preceded
     * by a space or a sequence of digits separated by some of the separator
     * used with dates or IP addresses such as ., -, and /.
     *
     * This is combined with a similar positive lookahead to the one in the
     * previous pattern. This ensures that a sequence of digits at the end
     * of a sentence will be captured correctly (lorem ipsum 2019.)
     *
     * If the sentence ends with something like an IP address (127.0.0.1.),
     * then the pattern will only match the last full stop.
     *
     *
     * The last alternative is the simplest:
     * \.$
     *
     * It matches the full stop at the end of the provided text.
     */
    const removeFullstopPattern =
        /(?<!\svs?)(?<=\s\w+[a-zA-Z]+)\.(?=\s*[a-zA-Z]+\w*)|(?<=\d+[\s./-]\d+|\s\d+)\.(?=\s*\W*[a-zA-Z]+\w*\W*)|\.$/g;

    return text
        .split(removeFullstopPattern)
        .filter((sentence) => sentence !== "")
        .map((sentence) => addFullstopAtEnd(trimTopAndTailSpaces(sentence)));
}

function combineSentencesIntoTweets(sentenceArray, combiningCharacter = " ") {
    /**
     * Takes an array of sentences and iterates over it combining
     * the sentences into tweets that aren't longer than 280
     * characters. However, if one of the sentences is shorter than
     * 70 (1/4th of 280), it will add the following sentence to it
     * even if the combined length is longer than 280. This is to
     * avoid having very short tweets unnecessarily. If the user
     * wants to have short tweets, they can force a split.
     *
     * Any tweets longer than 280 will be handled by further functions
     * that will eventually split them to fit the maximum character
     * count on Twitter.
     *
     * It uses a combiningCharacter parameter to allow the user to
     * define if they want a non-space character added between the
     * two sentences. If the combiningCharacter isn't specified, it
     * will just use a space.
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
        const lastSentenceIndex = outArray.length - 1;
        let lastSentence = outArray[lastSentenceIndex];

        const curSentence = sentenceArray[i];

        if (
            lastSentence.length <= TWEET_LENGTH / 4 ||
            lastSentence.length + curSentence.length <= TWEET_LENGTH
        ) {
            // If the current sentence starts with a newline character
            // we just concatenate it to the last sentence. Otherwise,
            // we add the combiningCharacter after the last sentence
            // then concatenate the current one
            lastSentence += curSentence.startsWith("\n")
                ? curSentence
                : `${combiningCharacter}${curSentence}`;

            outArray[lastSentenceIndex] = lastSentence;
        } else {
            outArray.push(sentenceArray[i]);
        }
    }

    return outArray;
}

function breakTweetAtNewlines(tweet) {
    /**
     * Takes a text and splits it into an array of tweets at the
     * newline characters
     */

    return tweet.split("\n").filter((tweet) => tweet !== "");
}

// Module functions exported mainly for testing purposes
export const fsSplitter = {
    trimTopAndTailSpaces,
    splitAtFullstops,
    combineSentencesIntoTweets,
    breakTweetAtNewlines,
    getSplitIndex,
    splitAtFirstFullstopOrNewline,
    splitAtLastFullstopOrNewline,
};
