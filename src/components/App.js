import { useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import classNames from "classnames";
import darkTheme from "../themes/threadder-dark-theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Header from "./Header";
import TweetInput from "./TweetInput";
import ThreadViewer from "./ThreadViewer";

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
        <ThemeProvider theme={darkTheme}>
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
                            xs={12}
                            className={classNames(
                                classes.appView,
                                classes.hiddenOverflow
                            )}
                        >
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
