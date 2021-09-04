import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import CustomIconButton from "./CustomIconButton";
import ImageIcon from "@material-ui/icons/Image";
import { TWEET_LENGTH } from "../utils/generalConstants";

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
        // the array map() method
        const filesArr = Array.from(files);
        const promises = filesArr.map((file) => readFile(file));

        Promise.all(promises)
            .then((results) => {
                props.addImagesHandler(results);
            })
            .catch((errors) => {
                console.log(errors);
            });
    };

    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.addEventListener("load", (event) => {
                resolve(event.target.result);
            });

            reader.addEventListener("error", () => {
                reject(`Error reading file: ${file.name}`);
            });
        });
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
                        accept={props.imageTypes.join(",")}
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
