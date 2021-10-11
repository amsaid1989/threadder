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
import {
    login,
    logout,
    publishAllTweetImages,
    publishThread,
} from "./controllers/APICalls";
import { setStorageItem, getStorageItem } from "./controllers/storageWrappers";
import { insertIntoText } from "./controllers/textManip";
import {
    openDB,
    dbConnected,
    clearImagesFromDB,
    getAllImagesFromDB,
} from "./controllers/db";
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
}));

export default function App(props) {
    const classes = useStyles();

    const untitledUser = {
        name: UNTITLED_NAME,
        screenName: UNTITLED_SCREEN_NAME,
        profileImage: UNTITLED_PROFILE_IMAGE,
    };

    /* APP STATE */
    // Technically, this state is not required and it is
    // not used by anything else. The only reason it exists
    // is because it is used as a dependency for a useEffect
    // hook that opens the database when the app first
    // starts. Without having a dependency for the hook, it
    // will keep running for every render, which means it
    // will go nonstop trying to open the database.
    const [dbOpen, setDBOpen] = useState(false);

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
    const [cursorPosition, setCursorPosition] = useState({
        start: tweetText.length,
        end: tweetText.length,
    });
    const [scrollPosition, setScrollPosition] = useState(0);
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

        setCursorPosition({
            start: event.target.selectionStart,
            end: event.target.selectionEnd,
        });
    };
    const updateCursorPosition = (event) => {
        /**
         * Updates the cursor position state whenever the user
         * changes the cursor position in the tweet input
         * textarea.
         */

        const start = event.target.selectionStart;
        const end = event.target.selectionEnd;

        setCursorPosition({ start, end });
    };
    const insertTextAtCursor = (text) => {
        /**
         * Inserts any text passed to it at the current cursor
         * position in the tweet text displayed in the input
         * area.
         */

        const [updatedText, newPos] = insertIntoText(
            tweetText,
            cursorPosition,
            text
        );

        setCursorPosition({ start: newPos, end: newPos });

        setTweetText(updatedText);
    };
    const insertEmoji = (emoji) => {
        /**
         * Event handler for the emoji picker. It inserts the
         * selected emoji at the current cursor position in
         * the tweet text.
         */

        insertTextAtCursor(emoji.native);
    };
    const addSplit = () => {
        /**
         * Event handler for the split text toolbar button
         * which adds a user defined split at the current
         * cursor position in the tweet text.
         */

        insertTextAtCursor("\n(---)\n");
    };
    const clearTweet = () => {
        /**
         * Event handler for the clear tweet toolbar button.
         */

        setTweetText("");
    };
    const toggleEditing = () => {
        /**
         * Handles switching between editing the tweet and
         * viewing the thread when the app is used on mobile
         * phones
         */

        setEditing(!editing);
    };
    const displayAlert = useCallback((level, message) => {
        /**
         * Displays an alert in the UI using the severity level and
         * the message specified.
         *
         * Defined as a useCallback hook, to allow using it as
         * a dependency for useEffect hooks.
         */
        setAlertVisibility(true);

        setAlertSeverity(level);

        setAlertMessage(message);
    }, []);
    const loginHandler = () => {
        /**
         * Event handler for the Login button
         */

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
         * Event handler for the Logout button
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
    const publishTweets = useCallback(async () => {
        /**
         * A helper function that handles calling the function
         * that sends the thread to the backend and clears the
         * tweet input textarea if the thread was published
         * successfully.
         */

        showDialog("Hold tight while we publish your thread");

        const toPublish = thread.map((tweet) => ({ text: tweet, media: [] }));

        const allImages = await getAllImagesFromDB();

        if (allImages instanceof Array && allImages.length > 0) {
            for (const tweetImages of allImages) {
                const index = Number(tweetImages.tweetIndex);

                try {
                    const mediaIDs = await publishAllTweetImages(
                        tweetImages.files
                    );

                    toPublish[index].media = mediaIDs;
                } catch {
                    closeDialog();

                    displayAlert(
                        "error",
                        "Thread publishing was cancelled because publishing the images failed"
                    );

                    return;
                }
            }
        }

        publishThread(toPublish)
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
    }, [thread, displayAlert]);
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
    /* END EVENT HANDLERS AND FUNCTIONS */

    /* SIDE EFFECTS */
    // Runs when the app loads and tries to open the database.
    // TODO: Check to make sure that this hook doesn't keep running
    // if the connection to database fails.
    useEffect(() => {
        if (!dbOpen) {
            openDB()
                .then(() => {
                    setDBOpen(true);
                })
                .catch((err) => {
                    displayAlert("error", err);
                });
        }
    }, [dbOpen, displayAlert]);

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
    }, [displayAlert]);

    // When the backend redirects to the app, set the user to logged
    // in if the process was successful. It also sets some values in
    // the session storage for the alerts that will need to be displayed
    // in the UI once the login attempt is complete
    useEffect(() => {
        if (document.location.search !== "") {
            const user = queryString.parse(document.location.search);

            document.location.href = "/";

            if (checkUserObject(user)) {
                setLoggedIn(true);
                setUser(user);

                setStorageItem("session", "loginSuccessMessage", true);
            } else {
                setStorageItem("session", "loginFailMessage", true);
            }
        }
    }, []);

    useEffect(() => {
        if (
            document.location.search === "" &&
            thread.length > 0 &&
            getStorageItem("session", "publishAfterLogin")
        ) {
            setStorageItem("session", "publishAfterLogin", false);

            publishTweets();
        }
    }, [thread, publishTweets]);

    // On every update, make sure that the TweetInput area has its
    // cursor in the correct place. This is to ensure that, when the
    // user adds an emoji or a user defined split in the middle of any
    // text that already exists, the cursor doesn't jump to the end
    useEffect(() => {
        if (tweetInputRef.current) {
            tweetInputRef.current.selectionStart = cursorPosition.start;
            tweetInputRef.current.selectionEnd = cursorPosition.end;
        }
    });

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

    // When the tweet text is cleared, clear the stored images
    // from the IndexedDB if the tweet length is 0.
    // This runs in an interval until the connection to the
    // database is successful, and then it clears the images.
    // The reason we need to clear the images is that, all of
    // the application state is persisted in the sessionStorage
    // which is cleared automatically when the tab is closed.
    // However, the images are persisted in the IndexedDB, which
    // isn't cleared manually.
    useEffect(() => {
        let checkInterval;
        let checkTimeout;

        const clear = () => {
            if (dbConnected()) {
                clearInterval(checkInterval);

                if (tweetText.length === 0) {
                    clearImagesFromDB();
                }
            }
        };

        checkInterval = setInterval(clear, 20);

        // Setup a 10 second timeout. If the database
        // is still not connected after that, then
        // there is probably some problem with it and
        // it won't connect. This way, we won't keep
        // checking for it and wasting resources
        // unnecessarily.
        if (!checkTimeout) {
            checkTimeout = setTimeout(() => {
                clearInterval(checkInterval);
            }, 10000);
        }
    }, [tweetText]);

    // When the tweetText is updated, update the thread state,
    // store the tweetText in the sessionStorage to ensure
    // it persists across reloads and
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
    // useEffect(() => {
    //     setStorageItem("session", "thread", thread);
    // }, [thread]);

    // When an alert is shown in the UI, start a timeout to hide
    // it after a few seconds
    useEffect(() => {
        if (alertVisibility) {
            let closeAlertTimeout;

            if (closeAlertTimeout) {
                clearTimeout(closeAlertTimeout);
            }

            closeAlertTimeout = setTimeout(() => {
                setAlertVisibility(false);
            }, 4000);

            return () => clearTimeout(closeAlertTimeout);
        }
    }, [alertVisibility]);

    // Update the scroll position of the Thread Viewer when the
    // tweet text or the cursor position changes
    useEffect(() => {
        setScrollPosition(cursorPosition.end / tweetText.length);
    }, [cursorPosition, tweetText]);
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
                                        handleCursorPositionChange={
                                            updateCursorPosition
                                        }
                                        pickEmojiHandler={insertEmoji}
                                        splitTweetHandler={addSplit}
                                        clearTweetHandler={clearTweet}
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
                                        scroll={scrollPosition}
                                        editThreadHandler={toggleEditing}
                                        publishHandler={publishThreadHandler}
                                        setAlertData={displayAlert}
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
