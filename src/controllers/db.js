export function openDB(dbName, dbVersion, opts = undefined) {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            reject(
                opts?.unsupportedMsg ||
                    "Your browser doesn't support IndexedDB. Some features may not work properly."
            );
        }

        const openRequest = window.indexedDB.open(dbName, dbVersion);

        openRequest.addEventListener("error", () => {
            reject(`Failed to open database ${dbName}`);
        });

        openRequest.addEventListener("upgradeneeded", (event) => {
            if (opts.stores && opts.stores instanceof Array) {
                createStores(event.target.result, opts.stores);
            }
        });

        openRequest.addEventListener("success", (event) => {
            resolve(event.target.result);
        });
    });
}

function createIndices(objectStore, indices) {
    indices.forEach((index) => {
        objectStore.createIndex(index?.name, index?.keyPath, index?.params);
    });
}

function createStores(db, stores) {
    stores.forEach((store) => {
        /**
         * Expects an array of store objects. The object should
         * look like this:
         *
         * {
         *     name: required (string),
         *     config: optional (object),
         *     indices: optional (array of index objects)
         * }
         */

        if (store.name) {
            const objectStore = db.createObjectStore(store.name, store?.config);

            if (store.indices && store.indices instanceof Array) {
                createIndices(objectStore, store.indices);
            }
        }
    });
}
