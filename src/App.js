import { useState, useEffect, createRef } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import classNames from "classnames";
import darkTheme from "./themes/threadder-dark-theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Header from "./components/Header";
import TweetInput from "./components/TweetInput";
import ThreadViewer from "./components/ThreadViewer";
import splitTweet from "./controllers/tweetSplitter";
import { isNotEmpty, containsAllKeys } from "./utils/objectIntegrityCheckers";
import { login, publishThread } from "./controllers/APICalls";
import {
    setSesssionStorageItem,
    getSesssionStorageItem,
} from "./controllers/sessionStorageWrappers";
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
    const [loginCallback, setLoginCallback] = useState(false);
    const [loggedIn, setLoggedIn] = useState(
        getSesssionStorageItem("loggedIn") || false
    );
    const [user, setUser] = useState(
        getSesssionStorageItem("user") || untitledUser
    );
    const [tweetText, setTweetText] = useState(
        getSesssionStorageItem("tweetText") || ""
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
        login()
            .then((user) => {
                setLoggedIn(true);
                setUser(user);
            })
            .catch((err) => console.log(err));
    };
    const finaliseLogout = () => {
        /**
         * A convenience function that resets the loggedIn
         * and user states to their initial values. It is
         * used when the page reloads after the login process
         * when the login fails. It is also passed to the
         * Header component to be used as part of the click
         * handler of the logout menu item.
         */

        setLoggedIn(false);
        setUser(untitledUser);
    };
    const publishTweets = () => {
        publishThread(thread)
            .then(() => {
                setTweetText("");
            })
            .catch((err) => console.log(err));
    };
    const publishThreadHandler = () => {
        /**
         * Handles the click event of the Publish Thread button.
         * If the user is already logged in, then it just publishes
         * the thread. Otherwise, it sets the toPublish item in
         * the sessionStorage to true and initiates the login
         * process.
         *
         * The toPublish sessionStorage item determines whether
         * the application needs to publish a thread when the
         * page reloads or not.
         */

        if (loggedIn) {
            publishTweets();
        } else {
            setSesssionStorageItem("toPublish", true);

            loginHandler();
        }
    };
    /* END EVENT HANDLERS AND FUNCTIONS */

    /* SIDE EFFECTS */
    // When the backend redirects to the app, this will set the
    // state appropriately to only show a success message rather
    // than the app components
    useEffect(() => {
        if (document.location.search !== "") {
            setLoginCallback(true);
        }
    }, []);

    // Give focus to the tweet input area on page load and whenever
    // the tweet input is re-rendered
    useEffect(() => {
        if (tweetInputRef.current) {
            tweetInputRef.current.focus();
        }
    }, [tweetInputRef]);

    // On page load, check if the toPublish sessionStorage item
    // is true. This would indicate that the page load happened
    // because the user clicked the Publish Thread button without
    // being logged in, which initiated the login process.
    useEffect(() => {
        if (getSesssionStorageItem("toPublish")) {
            setSesssionStorageItem("toPublish", false);

            publishTweets();
        }
    });

    // On page load, if the user data is set in session storage
    // load the user data and set the user object
    useEffect(() => {
        const userObj = getSesssionStorageItem("user");

        if (
            userObj !== null &&
            isNotEmpty(userObj) &&
            containsAllKeys(userObj, ["name", "screenName", "profileImage"]) &&
            userObj.name !== UNTITLED_NAME
        ) {
            setLoggedIn(true);
            setUser(getSesssionStorageItem("user"));
        }
    }, []);

    // Update the session storage when the logged in state changes
    useEffect(() => {
        setSesssionStorageItem("loggedIn", loggedIn);
    }, [loggedIn]);

    // Update the session storage when the user state changes
    useEffect(() => {
        setSesssionStorageItem("user", user);
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

        setSesssionStorageItem("tweetText", tweetText);
    }, [tweetText]);

    // When the thread is updated, store it in the sessionStorage
    // to ensure it persists across reloads
    useEffect(() => {
        setSesssionStorageItem("thread", thread);
    }, [thread]);
    /* END SIDE EFFECTS */

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline>
                {/* The following component will render only when the backend redirects to the app
                after the user logs in successfully */}
                {loginCallback && (
                    <Container className={classes.root}>
                        <h2 className={classes.loggedInSuccess}>
                            Logged in successfully
                        </h2>
                    </Container>
                )}

                {!loginCallback && (
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
                                    setLoggedOutState={finaliseLogout}
                                    login={loginHandler}
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
                                            publishHandler={
                                                publishThreadHandler
                                            }
                                        />
                                    </Grid>
                                </Hidden>
                            </Grid>
                        </Grid>
                    </Container>
                )}
            </CssBaseline>
        </ThemeProvider>
    );
}
