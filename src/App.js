import { useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import classNames from "classnames";
import theme from "./threadder-theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
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
    mainArea: {
        flex: 1,
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
    const [thread, setThread] = useState([]);
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

                        {/*
                         * The main element of the App which display the tweet input
                         * and the thread viewer. It uses the hiddenOverflow class to
                         * make sure that no overflow happens when the number of tweets
                         * displayed in the ThreadViewer is too large.
                         * When overflow happens, the inner components of the ThreadViewer
                         * handles it so that the area where the tweets are displayed
                         * show a scroll bar.
                         */}
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
                            {editing ? (
                                <TweetInput
                                    tweetText={tweetText}
                                    handleTweetInput={updateTweet}
                                    thread={thread}
                                    viewThreadHandler={toggleEditing}
                                />
                            ) : (
                                <ThreadViewer
                                    user={user}
                                    thread={thread}
                                    editThreadHandler={toggleEditing}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </CssBaseline>
        </ThemeProvider>
    );
}
