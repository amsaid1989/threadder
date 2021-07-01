import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: "1em",
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
        padding: "0.4em",
    },
    threadLine: {
        width: "2px",
        height: "calc(100% + 1em)", // Adds the marginBottom value from the root to the height
        backgroundColor: theme.palette.background.default,
    },
    tweetContainer: {
        marginLeft: "1em",
    },
    resetFont: {
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
        whiteSpace: "pre-wrap",
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
                Container
                className={classNames(
                    classes.expandingFlexItem,
                    classes.verticalGrid,
                    classes.tweetContainer
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
