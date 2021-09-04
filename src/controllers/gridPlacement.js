import { isOdd, isEven } from "../utils/numUtils";

/**
 * Exports a couple of functions that are used in the tweet
 * component to control the placement of any images added to
 * the tweet.
 *
 * The images are added to a gallery that is made of a CSS
 * grid and can take a maximum of 4 images, since this is
 * the maximum number of images that can be added to a tweet.
 */

export function getColumn(itemIndex, totalItems) {
    /**
     * Calculates the start and end grid columns for an item
     * based on its index and the number of items in the grid.
     *
     * The values are mostly hard coded since a tweet can only
     * have a maximum of 4 images so there isn't a lot of
     * variation in how they could be placed.
     */

    let colStart, colEnd;

    if (isEven(itemIndex)) {
        colStart = 1;
    } else {
        colStart = 2;
    }

    if (
        (isEven(itemIndex) && totalItems === itemIndex + 1) ||
        isOdd(itemIndex)
    ) {
        colEnd = 3;
    } else {
        colEnd = 2;
    }

    return [colStart, colEnd];
}

export function getRow(itemIndex, totalItems) {
    /**
     * Calculates the start and end grid rows for an item
     * based on its index and the number of items in the grid.
     *
     * The values are mostly hard coded since a tweet can only
     * have a maximum of 4 images so there isn't a lot of
     * variation in how they could be placed.
     */

    let rowStart, rowEnd;

    if (itemIndex < 2) {
        rowStart = 1;
    } else {
        rowStart = 2;
    }

    if ((itemIndex < 2 && totalItems < 3) || itemIndex >= 2) {
        rowEnd = 3;
    } else {
        rowEnd = 2;
    }

    return [rowStart, rowEnd];
}
