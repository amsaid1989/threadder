import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Hidden from "@material-ui/core/Hidden";
import TweetToolbar from "./TweetToolbar";
import TweetImage from "./TweetImage";
import { getColumn, getRow } from "../controllers/gridPlacement";
import {
    dbConnected,
    indexExistsInDB,
    saveImagesToDB,
    modifyImagesInDB,
    deleteImagesFromDB,
    reloadImagesFromDB,
} from "../controllers/db";

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
        /**
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
        /**
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

    // Destruct the props objects to get some of the
    // items that will be used as dependencies for
    // some of the hooks.
    const { tweetIndex, setAlertData } = props;

    const [images, setImages] = useState([]);
    const [reloadImages, setReloadImages] = useState(true);
    const [disableAddImages, setDisableAddImages] = useState(false);

    const addImages = (imagesToAdd) => {
        /**
         * Updates the component state to add new
         * images to the tweet.
         */

        const updatedImages = [...images, ...imagesToAdd];

        setImages(updatedImages);
    };

    const removeImage = (index) => {
        /**
         * Updates the component state to delete
         * an image from the tweet.
         */

        const updatedImages = [
            ...images.slice(0, index),
            ...images.slice(index + 1),
        ];

        setImages(updatedImages);
    };

    const imageElements = images.map((image, index, arr) => {
        const [colStart, colEnd] = getColumn(index, arr.length);
        const [rowStart, rowEnd] = getRow(index, arr.length);

        const key = image + index + colStart + colEnd + rowStart + rowEnd;

        const src = URL.createObjectURL(image);

        return (
            <TweetImage
                key={key}
                imageSource={src}
                altText=""
                // Specify the column and row placement of each image
                // in the grid, so that images fill the entire grid
                // even if not all of the maximum of 4 images are added
                gridColumn={`${colStart} / ${colEnd}`}
                gridRow={`${rowStart} / ${rowEnd}`}
                imageIndex={index}
                deleteImageHandler={removeImage}
            />
        );
    });

    useEffect(() => {
        // When the app reloads, check the database for any
        // images that were added to the tweets before
        // reloading, and add them again.
        // It runs in an interval until the connection to
        // the database is successful and then it reloads
        // the images from the database.

        let checkInterval;
        let checkTimeout;

        const reload = () => {
            if (dbConnected()) {
                clearInterval(checkInterval);

                reloadImagesFromDB(tweetIndex).then((results) => {
                    setImages(results);
                });

                setReloadImages(false);
            }
        };

        if (reloadImages) {
            checkInterval = setInterval(reload, 20);

            // Setup a 10 second timeout. If the database
            // is still not connected after that, then
            // there is probably some problem with it and
            // it won't connect. This way, we won't keep
            // checking for it and wasting resources
            // unnecessarily.
            if (!checkTimeout) {
                checkTimeout = setTimeout(() => {
                    clearInterval(checkInterval);
                }, 10000);
            }
        }
    }, [reloadImages, tweetIndex]);

    useEffect(() => {
        // Disable the add images button once the limits defined by
        // Twitter are reached
        const shouldDisable =
            images.length === 4 ||
            (images.length === 1 && images[0].type === "image/gif");

        setDisableAddImages(shouldDisable);
    }, [images]);

    useEffect(() => {
        // Calls an asynchronous function each time the images
        // state is updated to save the state in the database.
        (async () => {
            if (dbConnected()) {
                // Checks if there is an entry for the tweet
                // already in the database.
                const checkIndex = await indexExistsInDB(tweetIndex);

                if (checkIndex) {
                    if (images.length > 0) {
                        modifyImagesInDB(tweetIndex, images).catch((err) => {
                            setAlertData("error", err);
                        });
                    } else {
                        deleteImagesFromDB(tweetIndex).catch((err) => {
                            setAlertData("error", err);
                        });
                    }
                } else {
                    if (images.length > 0) {
                        saveImagesToDB(tweetIndex, images).catch((err) => {
                            setAlertData("error", err);
                        });
                    }
                }
            }
        })();
    }, [tweetIndex, setAlertData, images]);

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
                        dangerouslySetInnerHTML={{ __html: props.text }}
                    />
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
