import axios from "axios";
import queryString from "query-string";
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

function getWindowSearchParams(window) {
    /**
     * Attempts to access the search parameters in the provided
     * window. If it succeeds, it returns the parsed parameters
     * as object. It doesn't do anything if it fails.
     */

    try {
        const user = queryString.parse(window.location.search);

        return user;
    } catch {}
}

function launchLoginPopup(url) {
    /**
     * Launches the login sequence in a popup window.
     */

    return window.open(
        url,
        "Login to Twitter",
        "width=500,height=720,toolbar=no,status=no,menubar=no"
    );
}

function checkLoginStatus(window) {
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
            const user = getWindowSearchParams(window);

            if (user) {
                // Clear both the timeout and interval
                // if the login completed successfully
                clearTimeout(loginTimeout);
                clearInterval(checkStatusInterval);

                resolve(user);
            }
        }, 2000);

        loginTimeout = setTimeout(() => {
            clearInterval(checkStatusInterval);

            reject("Login failed");
        }, 30000);
    });
}

export function login(finalCallback) {
    /**
     * Call the login route
     */

    return sendAPIRequest("/request_token", "get").then((response) => {
        // Start the login process in a popup window
        const popup = launchLoginPopup(response.data.redirect);

        // Return a Promise that will always close the popup window
        // whether the login was successful or not
        return checkLoginStatus(popup).finally(() => {
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
