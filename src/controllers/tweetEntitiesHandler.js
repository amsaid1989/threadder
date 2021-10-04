const hashtagAndMentionRegex = /(@\w+|#\w*[a-zA-Z]+\w*)/g;
const urlRegex =
    /(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*))/g;

function splitTweetEntities(tweet) {
    /**
     * Takes a string of text and splits any items that match
     * the global defined regex patterns and returns an array
     * that contains the text broken into different elements
     * that include the parts of the string that matched the
     * patterns.
     */

    return tweet
        .split(hashtagAndMentionRegex)
        .map((item) => {
            if (!item) {
                return "";
            }

            return item.split(urlRegex);
        })
        .flat()
        .filter((item) => item && item !== "");
}

export function highlightTweetEntities(tweet, HashtagAndMention, URL) {
    /**
     * Converts all of the tweet entities into their respective
     * React components.
     */

    let output = [];

    if (typeof tweet === "string") {
        output = splitTweetEntities(tweet).map((item, index) => {
            if (hashtagAndMentionRegex.test(item)) {
                return (
                    <HashtagAndMention key={`${item}-${index}`} text={item} />
                );
            }

            if (urlRegex.test(item)) {
                return <URL key={`${item}-${index}`} url={item} />;
            }

            return item;
        });
    }

    return output;
}
