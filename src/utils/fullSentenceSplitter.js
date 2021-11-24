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
     * The pattern matches against several alternatives to check if they
     * exist in the text. It uses capturing groups for some of these
     * alternatives to ensure that the text is only split if one of the
     * alternatives captured is encountered.
     *
     * The first alternative is this:
     * \svs?\.
     * This matches a fullstop that comes after an abbreviation for the
     * word versus, whether it is abbreviated as v. or vs.
     * However, this fullstop isn't captured so it isn't used as a splitting
     * point for the text.
     *
     * The second alternative is this:
     * \s\w+[a-zA-Z]+(\.)(?=\s*[a-zA-Z]+\w*)
     * NOTE: The fullstop is captured in this alternative.
     * This matches any fullstop that is preceeded and succeeded by strings
     * that contain at least 1 alphabetic character.
     * So, a string like this: "testing strings. this should split"
     * will be split because the fullstop is preceeded and succeeded by
     * strings that match this alternative.
     * The same goes for: "123m. GBP123".
     * However, a string similar to this won't be matched: "123. 321" since
     * it doesn't fulfill the requirement of having at least 1 alphabetical
     * character in the strings that preceed and succeed the fullstop.
     *
     * NOTE: The third alternative is this:
     * \d+[\s./-]\d+(\.)(?=\s*\W*[a-zA-Z]+\w*\W*)
     * The fullstop is captured in this alternative.
     * This matches a fullstop that comes after a string of digits split by
     * a space, a slash or a dash, and is succeeded by a strings of characters
     * that contains at least 1 alphabetical character. This is to ensure that
     * a fullstop that comes after an IP address, for instance, can be used
     * to split the text, but the fullstops that actually separate the parts
     * of the IP address are ignored.
     *
     * The fourth alternative is this:
     * \s\d+(\.)(?=\s*\W*[a-zA-Z]+\w*\W*)
     * NOTE: The fullstop is captured in this alternative.
     * This matches against any fullstop preceeded by a string of digits, that
     * come after a whitespace, and succeeded by a string of characters that
     * contains at least 1 alphabetical character.
     * This is to ensure that a fullstop that comes after, for instance, a year
     * in numerical format (e.g. I was born in 2000. I am now 21 years old) will
     * be used as a splitting point if it is followed by a string that contains
     * alphabetical characters.
     *
     * The last alternative is this:
     * (\.)$
     * NOTE: The fullstop is captured in this alternative.
     * This is the simplest alternative. It basically matches any fullstop that
     * comes at the end of a string.
     */

    const removeFullstopPattern =
        /\svs?\.|\s\w+[a-zA-Z]+(\.)(?=\s*[a-zA-Z]+\w*)|\d+[\s./-]\d+(\.)(?=\s*\W*[a-zA-Z]+\w*\W*)|\s\d+(\.)(?=\s*\W*[a-zA-Z]+\w*\W*)|(\.)$/g;

    let splitIndices = [];

    for (const match of text.matchAll(removeFullstopPattern)) {
        if (match[1] || match[2] || match[3] || match[4]) {
            splitIndices.push(match.index + match[0].length);
        }
    }

    if (splitIndices.length === 0) {
        return [text];
    }

    return splitIndices
        .map((splitIndex, index, arr) => {
            if (index === 0) {
                if (arr.length > 1) {
                    return text.slice(0, splitIndex);
                } else {
                    return [text.slice(0, splitIndex), text.slice(splitIndex)];
                }
            }

            if (index + 1 === arr.length) {
                const prevSplitIndex = arr[index - 1];

                return [
                    text.slice(prevSplitIndex, splitIndex),
                    text.slice(splitIndex),
                ];
            }

            return text.slice(arr[index - 1], splitIndex);
        })
        .flat()
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
