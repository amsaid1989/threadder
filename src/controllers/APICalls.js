import axios from "axios";
import { getStorageItem, setStorageItem } from "./storageWrappers";
import { SERVER } from "../utils/generalConstants";

function sendAPIRequest(url, method, data = undefined) {
    /*
     * Utility function that makes a request to the backend
     * sending along any data that is passed as an argument.
     */

    return axios({
        url: url,
        method: method,
        withCredentials: true,
        baseURL: SERVER,
        data: data ? data : {},
    });
}

function checkLoginStatus() {
    /**
     * Checks the progress of the login process in the
     * provided window.
     *
     * Returns a Promise that resolves if the process
     * completes successfully and rejects if the process
     * times out. Currently, it is set to time out after
     * 15 seconds.
     */

    let checkStatusInterval;
    let loginTimeout;

    return new Promise((resolve, reject) => {
        checkStatusInterval = setInterval(() => {
            if (getStorageItem("local", "userUpdated")) {
                clearInterval(checkStatusInterval);
                clearTimeout(loginTimeout);

                setStorageItem("local", "userUpdated", false);

                resolve("Login successful");
            }
        }, 1000);

        loginTimeout = setTimeout(() => {
            clearInterval(checkStatusInterval);

            reject("Login failed because the process timed out");
        }, 10000);
    });
}

export function login(finalCallback) {
    /**
     * Call the login route
     */

    return sendAPIRequest("/request_token", "get").then((response) => {
        // Start the login process in a popup window
        const popup = window.open(
            response.data.redirect,
            "Login to Twitter",
            "width=500,height=720"
        );

        // Return a Promise that attempts to close the popup window
        // whether the login was successful or not
        return checkLoginStatus().finally(() => {
            popup.close();

            finalCallback();
        });
    });
}

export function logout() {
    /**
     * Call the logout route
     */

    return sendAPIRequest("/logout", "get");
}

export function publishThread(thread) {
    /**
     * Call the publish_thread route
     */

    return sendAPIRequest("/publish_thread", "post", { tweets: thread });
}
