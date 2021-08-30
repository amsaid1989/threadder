import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import BackspaceIcon from "@material-ui/icons/Backspace";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import Hidden from "@material-ui/core/Hidden";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import data from "emoji-mart/data/twitter.json";
import { NimblePicker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import "./emojiPicker.css";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        marginTop: "0.5em",
    },
    toolbarButton: {
        marginRight: "0.45em",
        color: theme.palette.secondary.dark,
        "&:hover": {
            color: theme.palette.secondary.main,
        },
    },
}));

export default function InputToolbar(props) {
    const classes = useStyles();

    const [pickerOpen, setPickerOpen] = useState(false);

    const handlePickerClick = () => {
        /**
         * Handles the user click on the button the toggles
         * the emoji picker.
         */

        setPickerOpen((prevState) => !prevState);
    };

    const handleClickAway = () => {
        setPickerOpen(false);
    };

    return (
        <div className={classes.root}>
            <Hidden smDown>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <span style={{ position: "relative" }}>
                        {pickerOpen && (
                            <NimblePicker
                                set="twitter"
                                data={data}
                                title=""
                                emoji=""
                                showPreview={false}
                                perLine={8}
                                onSelect={props.pickEmojiHandler}
                            />
                        )}
                        <IconButton
                            className={classes.toolbarButton}
                            size="small"
                            onClick={handlePickerClick}
                            title="Add emoji"
                        >
                            <EmojiEmotionsIcon />
                        </IconButton>
                    </span>
                </ClickAwayListener>
            </Hidden>
            <IconButton
                className={classes.toolbarButton}
                size="small"
                title="Split thread"
            >
                <ViewAgendaIcon />
            </IconButton>
            <IconButton
                className={classes.toolbarButton}
                size="small"
                title="Clear thread"
            >
                <BackspaceIcon />
            </IconButton>
        </div>
    );
}
