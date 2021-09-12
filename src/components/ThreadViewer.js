import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import StyledButton from "./StyledButton";
import Hidden from "@material-ui/core/Hidden";
import Tweet from "./Tweet";

/**
 * The styles and implementation of the Thread Viewer component.
 * This component will show the tweets passed from the App
 * component using the Tweet component.
 * It also has the Publish Thread button which activates when
 * there are at least 1 tweet added.
 */

const useStyles = makeStyles((theme) => ({
    root: {
        flexFlow: "column nowrap",
    },
    fullHeight: {
        height: "100%",
    },
    containerWithShadow: {
        boxShadow: theme.shadows[4],
    },
    expandingFlexItem: {
        flex: 1,
    },
    fixedSizeFlexItem: {
        flex: 0,
    },
    autoOverflow: {
        overflow: "auto",
    },
    hiddenOverflow: {
        overflow: "hidden",
    },
    tweetsContainer: {
        padding: "1.5em",
        backgroundColor: theme.palette.primary.main,
    },
    buttonRowContainer: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between",
        gap: "1em",
        margin: 0,
        padding: 0,
    },
}));

export default function ThreadViewer(props) {
    const classes = useStyles();

    const tweets = props.thread.map((tweet, index, arr) => (
        <Tweet
            // The index is used as a key here on purpose because
            // it is the only unique identifier available for the
            // tweet, apart from its text.
            // Since the data comes directly from user inputting
            // the text, there is no way to get an ID for each
            // tweet.
            // The text of the tweet could have been used as a key
            // but that would create issues if the user adds images
            // to the tweet, because if the user decides to change
            // the text, then the key would change and the images
            // would be removed.
            // Using the index as a key solves this issue, because
            // the images are added to the tweet based on its
            // location in the array. However, this creates another
            // issue. If the user adds images to the tweet, then
            // decides to add another tweet before it, then all the
            // images would shift to the previous tweet.
            // However, the user adding an entire tweet before is
            // definitely less likely to happen than the user updating
            // the text of the tweet, it makes more sense to rely on
            // the array index, until a better solution to identify
            // each tweet is figured out.
            key={index}
            tweetIndex={index}
            user={props.user}
            text={tweet}
            threadLine={index + 1 < arr.length}
            setAlertData={props.setAlertData}
        />
    ));

    return (
        <Grid
            container
            spacing={2}
            className={classNames(
                classes.root,
                classes.fullHeight,
                classes.hiddenOverflow
            )}
        >
            {/* GRID ITEM 01: Thread List */}
            <Grid
                item
                xs={12}
                className={classNames(
                    classes.expandingFlexItem,
                    classes.fullHeight,
                    classes.hiddenOverflow
                )}
            >
                <Container
                    className={classNames(
                        classes.tweetsContainer,
                        classes.fullHeight,
                        classes.containerWithShadow,
                        classes.autoOverflow
                    )}
                >
                    {tweets}
                </Container>
            </Grid>

            {/* GRID ITEM 02: Button Bar
            The Edit Thread button will be hidden in the desktop view of the app */}
            <Grid item xs={12} className={classes.fixedSizeFlexItem}>
                <Container
                    className={classNames(
                        classes.buttonRowContainer,
                        classes.fullHeight
                    )}
                >
                    <Hidden mdUp>
                        <StyledButton
                            variant="contained"
                            color="secondary"
                            fullWidth
                            onClick={props.editThreadHandler}
                        >
                            Edit thread
                        </StyledButton>
                    </Hidden>

                    <StyledButton
                        variant="contained"
                        color="secondary"
                        onClick={props.publishHandler}
                        disabled={!tweets.length > 0}
                        fullWidth
                    >
                        Publish thread
                    </StyledButton>
                </Container>
            </Grid>
        </Grid>
    );
}
