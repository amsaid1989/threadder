import { UNTITLED_NAME } from "./generalConstants";

export function checkUserObject(userObj) {
    return (
        userObj !== null &&
        isNotEmpty(userObj) &&
        containsAllKeys(userObj, ["name", "screenName", "profileImage"]) &&
        userObj.name !== UNTITLED_NAME
    );
}

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
