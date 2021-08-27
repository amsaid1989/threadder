import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        marginTop: "0.5em",
    },
}));

export default function InputToolbar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root} onClick={props.onClick}>
            <IconButton
                color="secondary"
                size="small"
                onClick={props.emojiPickerHandler}
            >
                <EmojiEmotionsIcon />
            </IconButton>
        </div>
    );
}
