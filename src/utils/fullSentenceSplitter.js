import { TWEET_LENGTH } from "./generalConstants";

export default function breakTextAtFullSentences(text) {
    /*
        The main function of the module which will be used by
        the tweet splitter module.
    */

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
    /*
        Splits the first sentence of a text made of multiple
        sentences split by fullstops or newlines.

        Returns the split text as an array.
    */

    // Get the index of the first fullstop and the first newline
    // then use the least of them as the index of where to
    // split the text
    const firstFullstop = text.lastIndexOf(".");
    const firstNewline = text.lastIndexOf("\n");
    const splitIndex =
        firstFullstop < firstNewline ? firstFullstop : firstNewline;

    return [text.slice(0, splitIndex), text.slice(splitIndex)];
}

export function splitAtLastFullstopOrNewline(text) {
    /*
        Splits the last sentence of a text made of multiple
        sentences split by fullstops or newlines.

        Returns the split text as an array.
    */

    // Get the index of the last fullstop and the last newline
    // then use the greatest of them as the index of where to
    // split the text
    const lastFullstop = text.lastIndexOf(".");
    const lastNewline = text.lastIndexOf("\n");
    const splitIndex = lastFullstop > lastNewline ? lastFullstop : lastNewline;

    return [text.slice(0, splitIndex), text.slice(splitIndex)];
}

function trimTopAndTailSpaces(text) {
    /*
        Removes any spaces or tab characters from the start and end of
        a string. It is similar to the built-in trim() String method,
        but it doesn't remove newline characters like the trim() method
        does.
    */

    const startPattern = /^[ \t]*/;
    const endPattern = /[ \t]*$/;

    return text.replace(startPattern, "").replace(endPattern, "");
}

function splitAtFullstops(text) {
    /*
        Takes a string that has multiple sentences ending in full stops
        and splits it into an array of single sentences that each contain
        the full stop at the end.
        
        It works by checking for any full stops that are followed by
        a letter or a newline character because that would mean they are
        at the middle of the string. It then splits the string at these
        full stops, which removes them from the sentences, then rejoins
        the whole string with a full stop followed by a space.
        
        Next, it splits the string again at any space character that is
        preceded by a full stop. The result of this is that each sentence
        would end up keeping its full stop.
    */

    const removeFullstopPattern =
        /(?<=\d*[a-zA-Z]\w+)\.(?=\s*\d*[a-zA-Z]\w*\n?)/g;
    const removeSpacePattern = /(?<=\d*[a-zA-Z]\w+\.)\s/g;

    return text
        .split(removeFullstopPattern)
        .filter((sentence) => sentence !== "")
        .join(". ")
        .split(removeSpacePattern)
        .map((sentence) => trimTopAndTailSpaces(sentence));
}

function combineSentencesIntoTweets(sentenceArray, combiningCharacter = " ") {
    /*
        Takes an array of sentences and iterates over it combining
        the sentences into tweets that aren't longer than 280
        characters. However, if one of the sentences is shorter than
        70 (1/4th of 280), it will add the following sentence to it
        even if the combined length is longer than 280. This is to
        avoid having very short tweets unnecessarily. If the user
        wants to have short tweets, they can force a split.
        
        Any tweets longer than 280 will be handled by further functions
        that will eventually split them to fit the maximum character
        count on Twitter.
        
        It uses a combiningCharacter parameter to allow the user to
        define if they want a non-space character added between the
        two sentences. If the combiningCharacter isn't specified, it
        will just use a space.
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
    /*
        Takes a text and splits it into an array of tweets at the
        newline characters
    */

    return tweet.split("\n").filter((tweet) => tweet !== "");
}

// Module functions exported mainly for testing purposes
export const fsSplitter = {
    trimTopAndTailSpaces,
    splitAtFullstops,
    combineSentencesIntoTweets,
    breakTweetAtNewlines,
};
