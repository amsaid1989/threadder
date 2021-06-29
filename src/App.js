import { useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
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
}));

export default function App(props) {
    const classes = useStyles();

    const [loggedIn, setLoggedIn] = useState(false);
    const [tweetText, setTweetText] = useState("");
    const [thread, setThread] = useState([]);
    const [editing, setEditing] = useState(true);

    const updateTweet = (event) => {
        setTweetText(event.target.value);
    };
    const toggleEditing = () => {
        setEditing(!editing);
    };

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

                        <Grid item xs={12} className={classes.mainArea}>
                            {editing ? (
                                <TweetInput
                                    tweetText={tweetText}
                                    handleTweetInput={updateTweet}
                                    thread={thread}
                                    viewThreadHandler={toggleEditing}
                                />
                            ) : (
                                <ThreadViewer
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
