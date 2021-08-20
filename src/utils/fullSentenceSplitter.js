import { TWEET_LENGTH } from "./generalConstants";

export default function breakTextAtFullSentences(text) {
    /**
     * The main function of the module which will be used by
     * the tweet splitter module.
     *
     * It starts by splitting the text at newline characters,
     * then splits any tweets that are still longer than the
     * maximum tweet length at fullstops.
     */

    const newLineSplit = combineSentencesIntoTweets(
        splitAtNewlines(text),
        "\n"
    );

    // Return early if all tweets are shorter than the maximum
    // character count allowed for tweets
    if (newLineSplit.every((tweet) => tweet.length <= TWEET_LENGTH)) {
        return newLineSplit;
    }

    // If there are tweets that are still longer than the maxmium
    // allowed character count, attempt to split these tweets
    // at fullstops, since a fullstop is usually an indication of
    // a new sentence. However, make sure that sentences aren't
    // split into extermely short tweets by recombining them
    const fullSentenceSplit = combineSentencesIntoTweets(
        newLineSplit
            .map((tweet) => {
                if (tweet.length <= TWEET_LENGTH) {
                    return tweet;
                }

                return splitAtFullstops(tweet);
            })
            .flat()
            .map((tweet) => tweet.trim())
    );

    return fullSentenceSplit;
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

function splitAtNewlines(tweet) {
    /**
     * Takes a text and splits it into an array of tweets at the
     * newline characters
     */

    return tweet.split(/(\n)/).filter((tweet, idx, arr) => {
        // This filters double newline characters keeping only
        // one of them
        return tweet !== "\n" || (tweet === "\n" && arr[idx] !== "\n");
    });
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
        /((?<!\svs?)(?<=\s\w+[a-zA-Z]+)\.(?=\s*[a-zA-Z]+\w*)|(?<=\d+[\s./-]\d+|\s\d+)\.(?=\s*\W*[a-zA-Z]+\w*\W*)|\.$)/g;

    return text
        .split(removeFullstopPattern)
        .map((tweet, idx, arr) => {
            if (arr[idx + 1] === ".") {
                return `${tweet}.`;
            } else if (tweet === ".") {
                return "";
            } else {
                return tweet;
            }
        })
        .filter((tweet) => tweet !== "")
        .map((tweet) => trimTopAndTailSpaces(tweet));
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

// Module functions exported mainly for testing purposes
export const fsSplitter = {
    trimTopAndTailSpaces,
    splitAtFullstops,
    combineSentencesIntoTweets,
    splitAtNewlines,
};
