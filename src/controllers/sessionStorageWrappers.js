export function setSesssionStorageItem(itemName, itemValue) {
    /*
     * A thin wrapper around the setItem method of the sessionStorage
     * which converts any object passed to it in the itemValue argument
     * to a string that can be saved in the storage.
     */
    sessionStorage.setItem(itemName, JSON.stringify(itemValue));
}

export function getSesssionStorageItem(itemName) {
    /*
     * A thin wrapper around the getItem method of the sessionStorage
     * which converts the string representation of the value stored in
     * the item into a Javascript object.
     */
    return JSON.parse(sessionStorage.getItem(itemName));
}

export function removeSessionStorageItem(itemName) {
    sessionStorage.removeItem(itemName);
}
