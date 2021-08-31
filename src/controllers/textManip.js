export function insertIntoText(text, cursorObj, textToAdd) {
    const before = text.slice(0, cursorObj.start);
    const after = text.slice(cursorObj.end);

    const updatedText = before + textToAdd + after;

    const newPos = cursorObj.start + textToAdd.length;

    return [updatedText, newPos];
}
