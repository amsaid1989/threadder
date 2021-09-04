import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Hidden from "@material-ui/core/Hidden";
import TweetToolbar from "./TweetToolbar";
import TweetImage from "./TweetImage";
import { getColumn, getRow } from "../controllers/gridPlacement";

/**
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

        /**
         * This ensures that any line breaks or extra white spaces added
         * by the user in the TweetInput component is not discarded when
         * displayed in the Tweet component.
         */
        whiteSpace: "pre-wrap",

        overflowWrap: "break-word",
    },
    imageGallery: {
        width: "100%",
        height: "16em",
        minHeight: "16em",
        maxHeight: "16em",
        marginTop: "0.4em",
        borderRadius: "0.5em",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gridGap: "0.25em",
    },
    hiddenOverflow: {
        overflow: "hidden",
    },
}));

export default function Tweet(props) {
    const classes = useStyles();

    const supportedImageTypes = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

    const [images, setImages] = useState([]);
    const [disableAddImages, setDisableAddImages] = useState(false);

    const addImages = (imagesToAdd) => {
        const updatedImages = [...images, ...imagesToAdd];

        if (exceedsAllowedLimits(updatedImages)) {
            props.setAlertData(
                "error",
                "A maximum of 1 GIF or 4 images can be added"
            );

            return;
        }

        if (!allFilesAreSupported(updatedImages)) {
            props.setAlertData(
                "error",
                `Only the following file types are supported: ${supportedImageTypes.join(
                    ", "
                )}`
            );

            return;
        }

        setImages(updatedImages);
    };

    const allFilesAreSupported = (files) => {
        /**
         * Tests all files in an array to make sure that they all
         * are supported image types.
         */

        // Clean the file extensions from the dot at the beginning
        // and prefix the extension with the string 'image/' because
        // that is how the image type appears in the file URL as
        // formatted by the FileReader
        const extensions = supportedImageTypes.map(
            (type) => `image/${type.slice(1)}`
        );

        return files.every((file) => {
            return extensions.some((ext) => file.includes(ext));
        });
    };

    const exceedsAllowedLimits = (files) => {
        /**
         * Tests all the files in the array to test if it exceeds
         * the maximum number of images allowed by Twitter (currently,
         * 1 GIF or 4 images).
         *
         * Returns true if the limits are exceeded, false otherwise.
         */

        return (
            files.length > 4 ||
            (files.some((file) => file.includes("image/gif")) &&
                files.length > 1)
        );
    };

    const imageElements = images.map((image, index, arr) => {
        const [colStart, colEnd] = getColumn(index, arr.length);
        const [rowStart, rowEnd] = getRow(index, arr.length);

        return (
            <TweetImage
                key={image}
                imageSource={image}
                altText=""
                // Specify the column and row placement of each image
                // in the grid, so that images fill the entire grid
                // even if not all of the maximum of 4 images are added
                gridColumn={`${colStart} / ${colEnd}`}
                gridRow={`${rowStart} / ${rowEnd}`}
            />
        );
    });

    useEffect(() => {
        // Disables the add images button once the limits defined by
        // Twitter are reached
        const shouldDisable =
            images.length === 4 ||
            (images.length === 1 && images[0].includes("image/gif"));

        setDisableAddImages(shouldDisable);
    }, [images]);

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
                    <Avatar
                        src={props.user.profileImage}
                        alt={`${props.user.name} profile picture`}
                    />
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
                        {`@${props.user.screenName}`}
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

                <Hidden xsUp={images.length === 0}>
                    <Grid
                        item
                        className={classNames(
                            classes.imageGallery,
                            classes.hiddenOverflow
                        )}
                    >
                        {imageElements}
                    </Grid>
                </Hidden>

                <Grid item>
                    <TweetToolbar
                        imageTypes={supportedImageTypes}
                        length={props.text.length}
                        addDisabled={disableAddImages}
                        setAlertData={props.setAlertData}
                        addImagesHandler={addImages}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}
