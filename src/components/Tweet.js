import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

/*
 * The style and implementation of the Tweet component which is used
 * by the ThreadViewer to display the split tweets in a format that
 * is familiar to a Twitter user.
 * It shows a picture of the logged in user, the user's name and
 * their Twitter handle, as well as the text for each of the tweets.
 */

const useStyles = makeStyles((theme) => ({
    root: {
        /*
         * Styles that apply to the main container of the Tweet component.
         * It adds a margin to the bottom of the component if there are
         * multiple tweets displayed. If the tweet is the last one, or the
         * only one, in the thread, then no margin is added.
         */
        marginBottom: "1.5em",
        flexFlow: "row nowrap",
        "&:last-child": {
            marginBottom: 0,
        },
    },
    expandingFlexItem: {
        flex: 1,
    },
    fixedSizeFlexItem: {
        flex: 0,
    },
    verticalGrid: {
        display: "flex",
        flexFlow: "column nowrap",
    },
    centerVerticalGridItems: {
        alignItems: "center",
    },
    threadLineContainer: {
        padding: 0,
    },
    threadLine: {
        /*
         * A class that controls the appearance of the line that
         * visually connects each tweet to the following one in
         * the thread.
         * This lines serves no functional purpose. It is just
         * a visual cue, that is already used by Twitter, to
         * indicate that these tweets belong together in the same
         * thread.
         */
        width: "2px",

        // Add the marginBottom value from the root to the height
        height: "calc(100% + 1.5em)",

        backgroundColor: theme.palette.background.default,
    },
    tweetContainer: {
        marginLeft: "1em",
    },
    resetFont: {
        /*
         * A helper class to make sure that an element uses the parent's
         * font family and font size
         */
        fontFamily: "inherit",
        fontSize: "inherit",
    },
    defaultTextColor: {
        color: theme.palette.primary.contrastText,
    },
    userName: {
        fontWeight: "bold",
    },
    userHandle: {
        color: theme.palette.primary.contrastText2,
        marginLeft: "0.5em",
    },
    tweetText: {
        padding: 0,
        margin: 0,
        marginTop: "0.25em",

        /*
         * This ensures that any line breaks or extra white spaces added
         * by the user in the TweetInput component is not discarded when
         * displayed in the Tweet component.
         */
        whiteSpace: "pre-wrap",

        overflowWrap: "break-word",
    },
    hiddenOverflow: {
        overflow: "hidden",
    },
}));

export default function Tweet(props) {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid
                container
                className={classNames(
                    classes.fixedSizeFlexItem,
                    classes.verticalGrid,
                    classes.centerVerticalGridItems
                )}
            >
                <Grid item>
                    <Avatar />
                </Grid>

                {/* Render a line that connects all tweets similar to
                 * what happens on Twitter when you write a thread.
                 * This only render if the tweet is not the last one
                 * which is determined based on the boolean prop
                 * 'threadLine'.
                 */}
                {props.threadLine && (
                    <Grid
                        item
                        className={classNames(
                            classes.expandingFlexItem,
                            classes.threadLineContainer
                        )}
                    >
                        <div className={classes.threadLine} />
                    </Grid>
                )}
            </Grid>

            {/* Vertical grid that contains the user information
             * as well as the text of the tweet.
             */}
            <Grid
                container
                className={classNames(
                    classes.expandingFlexItem,
                    classes.verticalGrid,
                    classes.tweetContainer,
                    classes.hiddenOverflow
                )}
            >
                {/* Grid item that includes the user information
                 * split over two spans, one for the name and
                 * another for the Twitter handle.
                 */}
                <Grid item>
                    <span
                        className={classNames(
                            classes.resetFont,
                            classes.defaultTextColor,
                            classes.userName
                        )}
                    >
                        {props.user.name}
                    </span>
                    <span
                        className={classNames(
                            classes.resetFont,
                            classes.userHandle
                        )}
                    >
                        {`@${props.user.handle}`}
                    </span>
                </Grid>

                {/* Grid item that includes the tweet text */}
                <Grid item>
                    <p
                        className={classNames(
                            classes.resetFont,
                            classes.defaultTextColor,
                            classes.tweetText
                        )}
                    >
                        {props.text}
                    </p>
                </Grid>
            </Grid>
        </Grid>
    );
}
