export function insertIntoText(text, cursorObj, textToAdd) {
    /**
     * Takes a string, a cursor object, an object with start
     * and end attributes, and another string that will be
     * added to the first string between the start and end
     * indices defined by the cursor object.
     *
     * Returns an array with the updated text and an updated
     * cursor object.
     */

    const before = text.slice(0, cursorObj.start);
    const after = text.slice(cursorObj.end);

    const updatedText = before + textToAdd + after;

    const newPos = cursorObj.start + textToAdd.length;

    return [updatedText, newPos];
}
