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
        height: "100vh",
        maxHeight: "100vh",
    },
    gridContainer: {
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
        setTweetText(event.target.value);
    };
    const toggleEditing = () => {
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

                        <Grid
                            item
                            xs={12}
                            className={classNames(
                                classes.mainArea,
                                classes.hiddenOverflow
                            )}
                        >
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
