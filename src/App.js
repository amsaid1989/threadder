import { useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import classNames from "classnames";
import theme from "./threadder-theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Header from "./components/Header";
import TweetInput from "./components/TweetInput";
import ThreadViewer from "./components/ThreadViewer";

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

    /* APP STATE */
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({
        name: "Untitled User",
        handle: "untitled_user",
    });
    const [tweetText, setTweetText] = useState("");
    const [thread, setThread] = useState([
        "ECaEXFulJOjlpfaAftISGCgmJJGjtSpNSytrMuzXJJQYWlsMfQMgMWMBhPlDvcWCZddmOdwqDvbitTifJAuCmSYsaBGlPQMmSvHeFVcAMILUcXDxXupBAMyXhMkpYUfYESWefiuXgPWKHKxePSMyGTBYHVfJvjnTCegTXkAlaQYJTyUPOPELJNRtJCeYAXeiZHnqnrdejjBVIIaDjiKcNyPZEFzVjgOboOngFucjsYEJwuLzaCjnBMExPLxqiIQuZeJNiaVGHNvROVRcWONBpdUI",
        "ECaEXFulJOjlpfaAftISGCgmJJGjtSpNSytrMuzXJJQYWlsMfQMgMWMBhPlDvcWCZddmOdwqDvbitTifJAuCmSYsaBGlPQMmSvHeFVcAMILUcXDxXupBAMyXhMkpYUfYESWefiuXgPWKHKxePSMyGTBYHVfJvjnTCegTXkAlaQYJTyUPOPELJNRtJCeYAXeiZHnqnrdejjBVIIaDjiKcNyPZEFzVjgOboOngFucjsYEJwuLzaCjnBMExPLxqiIQuZeJNiaVGHNvROVRcWONBpdUI",
        "ECaEXFulJOjlpfaAftISGCgmJJGjtSpNSytrMuzXJJQYWlsMfQMgMWMBhPlDvcWCZddmOdwqDvbitTifJAuCmSYsaBGlPQMmSvHeFVcAMILUcXDxXupBAMyXhMkpYUfYESWefiuXgPWKHKxePSMyGTBYHVfJvjnTCegTXkAlaQYJTyUPOPELJNRtJCeYAXeiZHnqnrdejjBVIIaDjiKcNyPZEFzVjgOboOngFucjsYEJwuLzaCjnBMExPLxqiIQuZeJNiaVGHNvROVRcWONBpdUI",
        "ECaEXFulJOjlpfaAftISGCgmJJGjtSpNSytrMuzXJJQYWlsMfQMgMWMBhPlDvcWCZddmOdwqDvbitTifJAuCmSYsaBGlPQMmSvHeFVcAMILUcXDxXupBAMyXhMkpYUfYESWefiuXgPWKHKxePSMyGTBYHVfJvjnTCegTXkAlaQYJTyUPOPELJNRtJCeYAXeiZHnqnrdejjBVIIaDjiKcNyPZEFzVjgOboOngFucjsYEJwuLzaCjnBMExPLxqiIQuZeJNiaVGHNvROVRcWONBpdUI",
    ]);
    const [editing, setEditing] = useState(true);
    /* END APP STATE */

    /* EVENT HANDLERS */
    const updateTweet = (event) => {
        /*
         * Handles user input in the textarea where the user
         * types the tweet they want to split into a thread.
         */

        setTweetText(event.target.value);
    };
    const toggleEditing = () => {
        /*
         * Handles switching between editing the tweet and
         * viewing the thread when the app is used on mobile
         * phones
         */

        setEditing(!editing);
    };
    /* END EVENT HANDLERS */

    /* SET UP COMPONENTS */
    const tweetInput = (
        <TweetInput
            tweetText={tweetText}
            handleTweetInput={updateTweet}
            thread={thread}
            viewThreadHandler={toggleEditing}
        />
    );

    const threadViewer = (
        <ThreadViewer
            user={user}
            thread={thread}
            editThreadHandler={toggleEditing}
        />
    );
    /* END SET UP COMPONENTS */

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Container className={classes.root}>
                    <Grid
                        container
                        spacing={3}
                        className={classes.gridContainer}
                    >
                        <Grid item xs={12} className={classes.appHeader}>
                            <Header loggedIn={loggedIn} />
                        </Grid>

                        <Grid
                            item
                            className={classNames(
                                classes.appView,
                                classes.hiddenOverflow
                            )}
                        >
                            <Hidden mdUp>
                                <Grid
                                    item
                                    xs={12}
                                    className={classNames(
                                        classes.mainArea,
                                        classes.hiddenOverflow
                                    )}
                                >
                                    {/*
                                     * Conditionally render either the TweetInput or the ThreadViewer
                                     * when in mobile view.
                                     */}
                                    {editing ? tweetInput : threadViewer}
                                </Grid>
                            </Hidden>

                            <Hidden smDown>
                                <Grid
                                    item
                                    xs={7}
                                    className={classNames(
                                        classes.mainArea,
                                        classes.hiddenOverflow
                                    )}
                                >
                                    {tweetInput}
                                </Grid>

                                <Grid
                                    item
                                    xs={5}
                                    className={classNames(
                                        classes.mainArea,
                                        classes.hiddenOverflow
                                    )}
                                >
                                    {threadViewer}
                                </Grid>
                            </Hidden>
                        </Grid>
                    </Grid>
                </Container>
            </CssBaseline>
        </ThemeProvider>
    );
}
