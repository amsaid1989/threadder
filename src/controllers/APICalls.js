import axios from "axios";

function sendAPIRequest(url, method, data = undefined) {
    /*
     * Utility function that makes a request to the backend
     * sending along any data that is passed as an argument.
     */

    return axios({
        url: url,
        method: method,
        withCredentials: true,
        data: data ? data : {},
    });
}

export function login() {
    /*
     * Call the login route
     */

    return sendAPIRequest("/request_token", "get")
        .then((response) => {
            // Redirect to the authentication URL
            document.location.href = response.data.redirect;
        })
        .catch((err) => console.log(err));
}

export function logout() {
    /*
     * Call the logout route
     */

    return sendAPIRequest("/logout", "get");
}

export function publishThread(thread) {
    /*
     * Call the publish_thread route
     */

    return sendAPIRequest("/publish_thread", "post", { tweets: thread });
}
