import darkTheme from "../themes/threadder-dark-theme";

export function matchEntitiesInTweet(tweet) {
    // This matches mentions and hashtags
    // TODO: Add URL pattern as well
    const pattern = /@\w+|#\w+[a-zA-Z]+\w+/g;

    let matches;

    if (typeof tweet === "string") {
        matches = tweet.matchAll(pattern) ?? [];
    }

    return matches;
}

function reverseSortMatchesArray(matchesArr) {
    const arr = Array.from(matchesArr);

    const compareFunc = (a, b) => {
        return b.index - a.index;
    };

    return arr.sort(compareFunc);
}

function highlightEntity(tweet, matchObj) {
    const highlightColor = darkTheme.palette.secondary.main;

    let output = tweet;

    const start = output.slice(0, matchObj.index);
    const end = output.slice(matchObj.index + matchObj[0].length);

    return (
        start +
        `<strong style="color: ${highlightColor};">${matchObj[0]}</strong>` +
        end
    );
}

export function highlightTweetEntities(tweet, matchesArray) {
    let output = tweet;

    const reversedArray = reverseSortMatchesArray(matchesArray);

    for (const match of reversedArray) {
        output = highlightEntity(output, match);
    }

    return output;
}
