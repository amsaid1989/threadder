function getStorage(name) {
    /**
     * Returns either the window's localStorage or sessionStorage
     * depending on the name passed by the user.
     *
     * If the name is invalid, then it returns undefined.
     */

    if (name === "local") {
        return localStorage;
    } else if (name === "session") {
        return sessionStorage;
    } else {
        return undefined;
    }
}

export function setStorageItem(storeName, itemName, itemValue) {
    /**
     * A thin wrapper around the setItem method which converts any
     * object passed to it in the itemValue argument to a string
     * that can be saved in the storage.
     */

    const storage = getStorage(storeName);

    if (storage) {
        storage.setItem(itemName, JSON.stringify(itemValue));
    }
}

export function getStorageItem(storeName, itemName) {
    /**
     * A thin wrapper around the setItem method which converts the
     * string representation of the value stored in the item into
     * a Javascript object.
     */

    const storage = getStorage(storeName);

    if (storage) {
        return JSON.parse(storage.getItem(itemName));
    }
}
