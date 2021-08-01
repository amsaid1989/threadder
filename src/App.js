import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
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

const useStyles = makeStyles((theme) => ({
    root: {
        /*
         * Styles that apply to the main Container component of the App
         */
        height: "100vh",
        maxHeight: "100vh",
    },
    gridContainer: {
        /*
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

    /* COOKIES */
    const [cookie] = useCookies(["user"]);
    /* END COOKIES */

    /* APP STATE */
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({
        name: "Untitled User",
        screenName: "untitled_user",
        profileImage: "",
    });
    const [tweetText, setTweetText] = useState("");
    const [thread, setThread] = useState([]);
    const [editing, setEditing] = useState(true);
    /* END APP STATE */

    /* EVENT HANDLERS */
    const updateTweet = (event) => {
        /*
         * Handles user input in the textarea where the user
         * types the tweet they want to split into a thread.
         */

        const text = event.target.value;

        setTweetText(text);

        if (text.length === 0) {
            setThread([]);
        } else {
            setThread(splitTweet(event.target.value));
        }
    };
    const toggleEditing = () => {
        /*
         * Handles switching between editing the tweet and
         * viewing the thread when the app is used on mobile
         * phones
         */

        setEditing(!editing);
    };
    const finaliseLogout = () => {
        setLoggedIn(false);
        setUser({
            name: "Untitled User",
            screenName: "untitled_user",
            profileImage: "",
        });
    };
    /* END EVENT HANDLERS */

    /* SIDE EFFECTS */
    // On page load, check for the user cookie and if it exists,
    // extract the user details and set the loggedIn state
    useEffect(() => {
        if (
            cookie.user !== undefined &&
            isNotEmpty(cookie.user) &&
            containsAllKeys(cookie.user, ["name", "screenName", "profileImage"])
        ) {
            setLoggedIn(true);
            setUser(cookie.user);
        } else {
            finaliseLogout();
        }
    }, [cookie.user]);
    /* END SIDE EFFECTS */

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline>
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
