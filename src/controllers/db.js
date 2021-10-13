import {
    THREADDER_DB_NAME,
    THREADDER_DB_VERSION,
} from "../utils/generalConstants";

// REVIEW: Try to simplify the database code and improve it.

let db;
let dbOpen = false;

export function dbConnected() {
    /**
     * Returns a boolean to indicate whether
     * the database was connected successfully
     * or not.
     */

    return dbOpen;
}

export function openDB() {
    /**
     * Initiates the process of opening the application database
     * and returns a promise that resolves once the database is
     * connected and rejects when any errors occur.
     */

    return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            reject(
                "Your browser doesn't support IndexedDB. Some features may not work properly."
            );
        }

        const openRequest = window.indexedDB.open(
            THREADDER_DB_NAME,
            THREADDER_DB_VERSION
        );

        openRequest.addEventListener("error", (event) => {
            const error = event.target.error;

            reject(`${error.name}: ${error.message}`);
        });

        openRequest.addEventListener("blocked", () => {
            reject(
                "Upgrading the database failed. Please close all other tabs with this site open."
            );
        });

        openRequest.addEventListener("upgradeneeded", (event) => {
            // On initial creation of the database, create the
            // stores required for the current version
            createStores(event.target.result);
        });

        openRequest.addEventListener("success", (event) => {
            db = event.target.result;
            dbOpen = true;

            db.addEventListener("close", () => {
                // Event handler that resets the dbOpen to
                // false when the database is closed
                dbOpen = false;
            });

            resolve("Connected");
        });
    });
}

export function clearImagesFromDB() {
    /**
     * Clears all entries in the images store. If successful, it
     * returns nothing. Otherwise, it returns an error message
     * to indicate that the process failed.
     */

    if (db && db instanceof IDBDatabase) {
        const transaction = db.transaction(["images"], "readwrite");

        const store = transaction.objectStore("images");

        const clearRequest = store.clear();

        transaction.addEventListener("error", () => {
            return "Clear images transaction failed";
        });

        clearRequest.addEventListener("error", () => {
            return "Clear images request failed";
        });
    }
}

function addOrUpdateImages(tweetIndex, imgArr, storeOperation) {
    /**
     * Utility function that adds a new entry to the database or
     * updates an existing one with an array of file objects passed
     * to it.
     *
     * It also takes a string that represents a store operation,
     * either 'add' or 'put'. This string will be passed as a key
     * to get the equivalent function from the objectStore prototype.
     */

    return new Promise((resolve, reject) => {
        if (db && db instanceof IDBDatabase) {
            // We first convert each file object to an array buffer
            // and store the buffer in an object that also contains
            // the file name and the file type.
            // The reason we convert the file objects to array
            // buffers is that, according to this article on Google
            // developers website (https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/indexeddb-best-practices#not_everything_can_be_stored_in_indexeddb_on_all_platforms)
            // storing File objects in an indexedDB doesn't work well
            // on all platforms.
            fileObjectsToBuffers(imgArr)
                .then((buffers) => {
                    const transaction = db.transaction(["images"], "readwrite");

                    const store = transaction.objectStore("images");

                    const tweetImages = { tweetIndex, buffers };

                    const request = store[storeOperation](tweetImages);

                    // EVENT HANDLERS
                    const errorHandler = () => {
                        reject("Failed to save images to database");
                    };

                    transaction.addEventListener("abort", () => {
                        reject("Adding images to the database was aborted");
                    });

                    transaction.addEventListener("error", errorHandler);

                    request.addEventListener("success", () => {
                        resolve("All done!");
                    });

                    request.addEventListener("error", errorHandler);
                })
                .catch(() => {
                    reject(
                        "Images are not formatted properly for the database"
                    );
                });
        } else {
            reject("Can't save any images because the database isn't open");
        }
    });
}

export function saveImagesToDB(tweetIndex, imgArr) {
    /**
     * Saves the images passed in the imgArr to the appropriate
     * store in the database.
     */

    return addOrUpdateImages(tweetIndex, imgArr, "add");
}

export function modifyImagesInDB(tweetIndex, imgArr) {
    /**
     * Updates an existing entry in the database with the new
     * imgArr.
     */

    return addOrUpdateImages(tweetIndex, imgArr, "put");
}

function getOrDeleteImagesFromDB(tweetIndex, storeOperation) {
    /**
     * Utility function that get or deletes an ew entry from the database.
     *
     * It takes a string that represents a store operation, either 'get'
     * or 'delete'. This string will be passed as a key to get the
     * equivalent function from the objectStore prototype.
     */

    return new Promise((resolve, reject) => {
        if (db && db instanceof IDBDatabase) {
            const transaction = db.transaction(["images"], "readwrite");

            const store = transaction.objectStore("images");

            const request = store[storeOperation](tweetIndex);

            const errorHandler = () => {
                reject("Failed to complete the required database operation");
            };

            transaction.addEventListener("abort", () => {
                reject("Database operation was aborted");
            });

            transaction.addEventListener("error", errorHandler);

            request.addEventListener("success", (event) => {
                resolve(event.target.result);
            });

            request.addEventListener("error", errorHandler);
        } else {
            reject(
                "Can't complete the database operation because the database isn't open"
            );
        }
    });
}

export function deleteImagesFromDB(tweetIndex) {
    /**
     * Deletes all images associated with a specific tweet from
     * the database.
     */

    return getOrDeleteImagesFromDB(tweetIndex, "delete");
}

export function reloadImagesFromDB(tweetIndex) {
    /**
     * Used when the page reloads to restore any images that
     * the user has added to any tweet before the reload.
     *
     * It returns a promise that doesn't reject. If there
     * were images stored in the database associated with
     * the current tweet, then it loads those images.
     *
     * Otherwise, it returns an empty array to indicate that
     * there was no images associated with this tweet.
     */

    return new Promise((resolve) => {
        getOrDeleteImagesFromDB(tweetIndex, "get")
            .then((results) => {
                if (results) {
                    // Convert the buffers back to file objects
                    // so they can be loaded in the UI
                    resolve(buffersToFileObjects(results.buffers));
                } else {
                    resolve([]);
                }
            })
            .catch(() => {
                resolve([]);
            });
    });
}

export function indexExistsInDB(tweetIndex) {
    /**
     * Checks a tweetIndex to see if it has an existing item
     * in the database.
     *
     * Returns a promise that doesn't reject. It resolves to
     * true if an item exists, and false otherwise.
     */

    return new Promise((resolve) => {
        getOrDeleteImagesFromDB(tweetIndex, "get")
            .then((results) => {
                if (results) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(() => {
                resolve(false);
            });
    });
}

export function getAllImagesFromDB() {
    return new Promise((resolve, reject) => {
        if (db && db instanceof IDBDatabase) {
            const transaction = db.transaction(["images"], "readonly");

            const store = transaction.objectStore("images");

            const request = store.getAll();

            const errorHandler = () => {
                reject("Failed to retrieve images from the database");
            };

            transaction.addEventListener("error", errorHandler);

            transaction.addEventListener("abort", () => {
                reject("Retrieving the images from the database was aborted");
            });

            request.addEventListener("error", errorHandler);

            request.addEventListener("success", (event) => {
                let out = [];

                for (let tweet of event.target.result) {
                    tweet.files = buffersToFileObjects(tweet.buffers);

                    delete tweet.buffers;

                    out.push(tweet);
                }

                resolve(out);
            });
        } else {
            reject("Database is not connected");
        }
    });
}

function createIndices(objectStore, indices) {
    /**
     * Utility function that takes an IndexedDB objectStore
     * and an array of objects defining indices and creates
     * those indices in the store.
     */

    indices.forEach((index) => {
        objectStore.createIndex(index?.name, index?.keyPath, index?.params);
    });
}

function createStores(db) {
    /**
     * Define the stores for the current version of the
     * application database.
     *
     * This function is called when the 'upgradeneeded'
     * event is fired when opening the database with
     * a new version.
     */

    const imagesStore = db.createObjectStore("images", {
        keyPath: "tweetIndex",
    });

    createIndices(imagesStore, [
        {
            name: "tweetIndex",
            keyPath: "tweetIndex",
            params: { unique: true },
        },
    ]);
}

function fileObjectsToBuffers(filesArr) {
    /**
     * Takes an array of File objects and converts the
     * files into ArrayBuffers. It then saves each buffer
     * in an object that also contains the file name
     * along with the file type.
     *
     * Returns a promise that resolves when all the File
     * objects are converted successfully into ArrayBuffer
     * objects.
     */

    const promises = filesArr.map(async (file) => {
        const buf = await file.arrayBuffer();

        if (buf instanceof ArrayBuffer) {
            return {
                name: file.name,
                type: file.type,
                buffer: buf,
            };
        }
    });

    return Promise.all(promises);
}

function buffersToFileObjects(buffersArr) {
    /**
     * Takes an array of objects that each contain an
     * ArrayBuffer, a file name and a file type and
     * constructs File objects out of this array.
     *
     * Returns the File objects in an array.
     */

    return buffersArr.map(
        (bufObj) =>
            new File([bufObj.buffer], bufObj.name, { type: bufObj.type })
    );
}
