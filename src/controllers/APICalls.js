import axios from "axios";
import { SERVER } from "../utils/generalConstants";

function sendAPIRequest(url, method, data = undefined) {
    /**
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

export function login() {
    /**
     * Call the login route
     */

    return sendAPIRequest("/request_token", "get");
}

export function logout() {
    /**
     * Call the logout route
     */

    return sendAPIRequest("/logout", "get");
}

export function publishAllTweetImages(files) {
    return new Promise((resolve, reject) => {
        const promises = files.map((file) => publishMedia(file));

        Promise.all(promises)
            .then((results) => {
                const output = results.map(
                    (response) => response.data.media_id
                );

                resolve(output);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function publishMedia(file) {
    const data = new FormData();

    data.append("mediaFile", file);

    return sendAPIRequest("/upload_media", "post", data);
}

export function publishThread(thread) {
    /**
     * Call the publish_thread route
     */

    return sendAPIRequest("/publish_thread", "post", { tweets: thread });
}
