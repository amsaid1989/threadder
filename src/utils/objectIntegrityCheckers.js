export function isNotEmpty(obj) {
    return Object.entries(obj).length > 0;
}

export function containsAllKeys(obj, keysArr) {
    const objKeys = Object.keys(obj);

    for (const key of keysArr) {
        if (!objKeys.includes(key)) {
            return false;
        }
    }

    return true;
}
