import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import StyledButton from "./StyledButton";
import Tweet from "./Tweet";

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

export default function TweetInput(props) {
    const classes = useStyles();

    // TODO: Implement the Tweet component that will be used here
    const tweets = props.thread.map((tweet, index, arr) => (
        <Tweet
            key={tweet}
            user={props.user}
            text={tweet}
            threadLine={index + 1 < arr.length}
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

            {/* GRID ITEM 02: Button Bar */}
            <Grid item xs={12} className={classes.fixedSizeFlexItem}>
                <Container
                    className={classNames(
                        classes.buttonRowContainer,
                        classes.fullHeight
                    )}
                >
                    <StyledButton
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={props.editThreadHandler}
                    >
                        Edit thread
                    </StyledButton>
                    <StyledButton
                        variant="contained"
                        color="secondary"
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
