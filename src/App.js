import { useState, useEffect, useCallback, createRef } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import classNames from "classnames";
import queryString from "query-string";
import darkTheme from "./themes/threadder-dark-theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Header from "./components/Header";
import TweetInput from "./components/TweetInput";
import ThreadViewer from "./components/ThreadViewer";
import MessagesDialog from "./components/MessagesDialog";
import CustomAlert from "./components/CustomAlert";
import splitTweet from "./controllers/tweetSplitter";
import { checkUserObject } from "./utils/objectIntegrityCheckers";
import { login, logout, publishThread } from "./controllers/APICalls";
import { setStorageItem, getStorageItem } from "./controllers/storageWrappers";
import {
    UNTITLED_NAME,
    UNTITLED_SCREEN_NAME,
    UNTITLED_PROFILE_IMAGE,
} from "./utils/generalConstants";

const useStyles = makeStyles((theme) => ({
    root: {
        /**
         * Styles that apply to the main Container component of the App
         */
        height: "100vh",
        maxHeight: "100vh",
        [theme.breakpoints.down("sm")]: {
            height: "93vh",
            maxHeight: "93vh",
        },
    },
    gridContainer: {
        /**
         * A class for the main grid layout of the App. It organises all
         * the main elements of the App in a column layout.
         */
        flexFlow: "column nowrap",
        height: "100%",
    },
    appHeader: {
        flex: 0,
    },
    appView: {
        flex: 1,
        [theme.breakpoints.up("md")]: {
            display: "flex",
            flexFlow: "row nowrap",
            gap: theme.spacing(1.5),
        },
    },
    mainArea: {
        height: "100%",
    },
    hiddenOverflow: {
        overflow: "hidden",
    },
    loggedInSuccess: {
        color: theme.palette.primary.contrastText,
        textAlign: "center",
        fontWeight: "normal",
    },
}));

export default function App(props) {
    const classes = useStyles();

    const untitledUser = {
        name: UNTITLED_NAME,
        screenName: UNTITLED_SCREEN_NAME,
        profileImage: UNTITLED_PROFILE_IMAGE,
    };

    /* APP STATE */
    const [alertVisibility, setAlertVisibility] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("error");
    const [alertMessage, setAlertMessage] = useState("");

    // Feedback dialog states
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState(
        "This is an empty dialog"
    );

    const [loggedIn, setLoggedIn] = useState(
        getStorageItem("session", "loggedIn") || false
    );
    const [user, setUser] = useState(
        getStorageItem("session", "user") || untitledUser
    );
    const [tweetText, setTweetText] = useState(
        getStorageItem("session", "tweetText") || ""
    );
    const [thread, setThread] = useState([]);
    const [editing, setEditing] = useState(true);
    /* END APP STATE */

    /* COMPONENT REFS */
    // createRef is used rather than useRef because the ref is
    // being forwarded, and useRef doesn't seem to allow for
    // ref forwarding.
    const tweetInputRef = createRef();
    /* END COMPONENT REFS */

    /* EVENT HANDLERS AND FUNCTIONS */
    const updateTweet = (event) => {
        /**
         * Handles user input in the textarea where the user
         * types the tweet they want to split into a thread.
         */

        const text = event.target.value;

        setTweetText(text);
    };
    const toggleEditing = () => {
        /**
         * Handles switching between editing the tweet and
         * viewing the thread when the app is used on mobile
         * phones
         */

        setEditing(!editing);
    };
    const loginHandler = () => {
        showDialog("Please wait while we try to log you into your account");

        login()
            .then((response) => {
                document.location.href = response.data.redirect;
            })
            .catch((err) => {
                console.log(err);

                const errorMessage =
                    typeof err === "string" ? err : "Login failed";

                displayAlert("error", errorMessage);
            })
            .finally(closeDialog);
    };
    const logoutHandler = () => {
        /**
         * Calls the logout API endpoint and resets the loggedIn
         * and user states to their initial values.
         */

        logout()
            .then(() => {
                displayAlert("success", "You are now logged out");

                setLoggedIn(false);
                setUser(untitledUser);
            })
            .catch((err) => {
                console.log(err);

                const errorMessage =
                    typeof err === "string" ? err : "Logout failed";

                displayAlert("error", errorMessage);
            });
    };
    const publishTweets = useCallback(() => {
        /**
         * A helper function that handles calling the function
         * that sends the thread to the backend and clears the
         * tweet input textarea if the thread was published
         * successfully.
         */

        showDialog("Hold tight while we publish your thread");

        publishThread(thread)
            .then(() => {
                displayAlert("success", "Thread published successfully");

                setTweetText("");
            })
            .catch((err) => {
                console.log(err);

                const errorMessage =
                    typeof err === "string"
                        ? err
                        : "Failed to publish your thread";

                displayAlert("error", errorMessage);
            })
            .finally(closeDialog);
    }, [thread]);
    const postLogin = useCallback(() => {
        /**
         * Checks if the thread needs to be published once
         * the login is successful. If it does, then it
         * publishes it.
         *
         * This happens when the user clicks the Publish
         * Thread button without logging in, which would
         * start the login sequence.
         */
        if (getStorageItem("session", "publishAfterLogin")) {
            setStorageItem("session", "publishAfterLogin", false);

            publishTweets();
        }
    }, [publishTweets]);
    const showDialog = (message) => {
        /**
         * Opens the modal dialog with the specified message.
         */

        setDialogMessage(message);
        setDialogOpen(true);
    };
    const closeDialog = () => {
        /**
         * Closes the modal dialog.
         */

        setDialogOpen(false);
    };
    const publishThreadHandler = () => {
        /**
         * Handles the click event of the Publish Thread button.
         * If the user is already logged in, then it just publishes
         * the thread. Otherwise, it sets the publishAfterLogin
         * item in the sessionStorage to true and initiates the
         * login process.
         *
         * The publishAfterLogin sessionStorage item determines
         * whether the application needs to publish a thread after
         * the user logs in successfully.
         */

        if (loggedIn) {
            publishTweets();
        } else {
            setStorageItem("session", "publishAfterLogin", true);

            loginHandler();
        }
    };
    const displayAlert = (level, message) => {
        setAlertVisibility(true);

        setAlertSeverity(level);

        setAlertMessage(message);
    };
    /* END EVENT HANDLERS AND FUNCTIONS */

    /* SIDE EFFECTS */
    // Once a login attempt is complete and the app reloads, check
    // the session store to display the appropriate alert depending
    // on whether the attempt was successful or not
    useEffect(() => {
        if (getStorageItem("session", "loginSuccessMessage")) {
            setStorageItem("session", "loginSuccessMessage", false);

            displayAlert("success", "You are now logged in");
        } else if (getStorageItem("session", "loginFailMessage")) {
            setStorageItem("session", "loginFailMessage", false);

            displayAlert("error", "Login failed");
        }
    }, []);

    // When the backend redirects to the app, set the user to logged
    // in if the process was successful. It also sets some values in
    // the session storage for the alerts that will need to be displayed
    // in the UI once the login attempt is complete
    useEffect(() => {
        if (document.location.search !== "") {
            const user = queryString.parse(document.location.search);

            document.location.search = "";

            if (checkUserObject(user)) {
                setLoggedIn(true);
                setUser(user);

                setStorageItem("session", "loginSuccessMessage", true);
            } else {
                setStorageItem("session", "loginFailMessage", true);
            }
        }
    }, [postLogin]);

    // Give focus to the tweet input area on page load and whenever
    // the tweet input is re-rendered
    useEffect(() => {
        if (tweetInputRef.current) {
            tweetInputRef.current.focus();
        }
    }, [tweetInputRef]);

    // Update the session storage when the logged in state changes
    useEffect(() => {
        setStorageItem("session", "loggedIn", loggedIn);
    }, [loggedIn]);

    // Update the session storage when the user state changes
    useEffect(() => {
        setStorageItem("session", "user", user);
    }, [user]);

    // When the tweetText is updated, update the thread state
    // and store the tweetText in the sessionStorage to ensure
    // it persists across reloads
    useEffect(() => {
        if (tweetText.length === 0) {
            setThread([]);
        } else {
            setThread(splitTweet(tweetText));
        }

        setStorageItem("session", "tweetText", tweetText);
    }, [tweetText]);

    // When the thread is updated, store it in the sessionStorage
    // to ensure it persists across reloads
    useEffect(() => {
        setStorageItem("session", "thread", thread);
    }, [thread]);

    useEffect(() => {
        if (alertVisibility) {
            let closeAlertTimeout;

            if (closeAlertTimeout) {
                clearTimeout(closeAlertTimeout);
            }

            closeAlertTimeout = setTimeout(() => {
                setAlertVisibility(false);
            }, 3000);

            return () => clearTimeout(closeAlertTimeout);
        }
    }, [alertVisibility]);
    /* END SIDE EFFECTS */

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline>
                <CustomAlert
                    visible={alertVisibility}
                    severity={alertSeverity}
                    msg={alertMessage}
                />

                <MessagesDialog open={dialogOpen} msg={dialogMessage} />

                <Container className={classes.root}>
                    <Grid
                        container
                        spacing={3}
                        className={classes.gridContainer}
                    >
                        {/* App Header grid item */}
                        <Grid item xs={12} className={classes.appHeader}>
                            <Header
                                user={user}
                                loggedIn={loggedIn}
                                login={loginHandler}
                                logout={logoutHandler}
                            />
                        </Grid>

                        {/* Grid item that holds both TweetInput and the ThreadViewer */}
                        <Grid
                            item
                            xs={12}
                            className={classNames(
                                classes.appView,
                                classes.hiddenOverflow
                            )}
                        >
                            {/* TweetInput item which gets hidden in mobile views if not editing */}
                            <Hidden smDown={!editing}>
                                <Grid
                                    item
                                    xs={12}
                                    md={7}
                                    className={classNames(
                                        classes.mainArea,
                                        classes.hiddenOverflow
                                    )}
                                >
                                    <TweetInput
                                        tweetText={tweetText}
                                        handleTweetInput={updateTweet}
                                        thread={thread}
                                        viewThreadHandler={toggleEditing}
                                        ref={tweetInputRef}
                                    />
                                </Grid>
                            </Hidden>

                            {/* ThreadViewer item which gets hidden in mobile views when editing */}
                            <Hidden smDown={editing}>
                                <Grid
                                    item
                                    xs={12}
                                    md={5}
                                    className={classNames(
                                        classes.mainArea,
                                        classes.hiddenOverflow
                                    )}
                                >
                                    <ThreadViewer
                                        user={user}
                                        thread={thread}
                                        editThreadHandler={toggleEditing}
                                        publishHandler={publishThreadHandler}
                                    />
                                </Grid>
                            </Hidden>
                        </Grid>
                    </Grid>
                </Container>
            </CssBaseline>
        </ThemeProvider>
    );
}
