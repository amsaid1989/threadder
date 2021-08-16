import { TWEET_LENGTH } from "./generalConstants";

const urlPattern = /((?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*))/;

export function isURL(text) {
    /*
        Checks a string against the URL regex pattern and returns
        a true if the text includes a URL, or false otherwise.
    */

    return urlPattern.test(text);
}

export default function detectAndSplitURLs(text) {
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
