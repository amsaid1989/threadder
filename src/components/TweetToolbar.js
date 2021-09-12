import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import CustomIconButton from "./CustomIconButton";
import ImageIcon from "@material-ui/icons/Image";
import {
    TWEET_LENGTH,
    MAX_IMAGE_SIZE,
    MAX_GIF_SIZE,
} from "../utils/generalConstants";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: "0.4em",
        display: "flex",
        flexFlow: "row nowrap",
        gap: 0,
        justifyContent: "space-between",
        alignItems: "center",
    },
    imageButton: {
        margin: 0,
        padding: 0,
        position: "relative",
        left: "-0.1875rem", // Calculated by dividing 3px by 16px which is equivalent to 1rem
    },
    resetFont: {
        /*
         * A helper class to make sure that an element uses the parent's
         * font family and font size
         */
        fontFamily: "inherit",
        fontSize: "inherit",
    },
    tweetLength: {
        margin: 0,
        width: "100%",
        textAlign: "right",
        color: theme.palette.secondary.main,
    },
}));

export default function TweetToolbar(props) {
    const classes = useStyles();

    const supportedImageTypes = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

    const triggerFileSelect = (event) => {
        /**
         * Triggers a click event on the file selection input
         * element which is hidden.
         */

        // We need to go 2 levels up to get the common parent
        const parent = event.target.parentElement.parentElement;

        const input = parent.querySelector("input[type='file']");

        input.click();
    };

    const filesSelectedHandler = (event) => {
        const files = event.target.files;

        if (files.length === 0) {
            return;
        }

        // Create an array from the files list to be able to use
        // the array every() and map() methods
        const filesArr = Array.from(files);

        if (exceedsAllowedLimits(filesArr)) {
            props.setAlertData(
                "error",
                "A maximum of 1 GIF or 4 images can be added"
            );

            return;
        }

        if (!allFilesAreSupported(filesArr)) {
            props.setAlertData(
                "error",
                `Only the following file types are supported: ${supportedImageTypes.join(
                    ", "
                )}`
            );

            return;
        }

        if (!filesArr.every((file) => fileSizeAllowed(file))) {
            props.setAlertData(
                "error",
                "You can only upload images that are smaller than 5 MB or GIFs smaller than 15 MB"
            );

            return;
        }

        props.addImagesHandler(filesArr);
    };

    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.addEventListener("load", (event) => {
                resolve({
                    url: event.target.result,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                });
            });

            reader.addEventListener("error", () => {
                reject(`Error reading file: ${file.name}`);
            });
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
            (files.some((file) => file.type === "image/gif") &&
                files.length > 1)
        );
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
            return extensions.some((ext) => file.type === ext);
        });
    };

    const fileSizeAllowed = (file) => {
        return (
            file.size < MAX_IMAGE_SIZE ||
            (file.type === "image/gif" && file.size < MAX_GIF_SIZE)
        );
    };

    return (
        <Grid className={classes.root}>
            <Grid item>
                <CustomIconButton
                    className={classes.imageButton}
                    size="small"
                    title="Add image"
                    disabled={props.addDisabled}
                    onClick={triggerFileSelect}
                >
                    <ImageIcon />
                    <input
                        type="file"
                        accept={supportedImageTypes.join(",")}
                        multiple
                        hidden
                        onChange={filesSelectedHandler}
                    />
                </CustomIconButton>
            </Grid>
            <Grid item>
                <p
                    className={classNames(
                        classes.resetFont,
                        classes.tweetLength
                    )}
                >
                    {`${props.length}/${TWEET_LENGTH}`}
                </p>
            </Grid>
        </Grid>
    );
}
