import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomIconButton from "./CustomIconButton";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import BackspaceIcon from "@material-ui/icons/Backspace";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import Hidden from "@material-ui/core/Hidden";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import data from "emoji-mart/data/twitter.json";
import { NimblePicker } from "emoji-mart";
import { isMobile } from "../utils/detectMobileBrowsers";
import "emoji-mart/css/emoji-mart.css";
import "./emojiPicker.css";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        marginTop: "0.5em",
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
            {/* EMOJI BUTTON */}
            <Hidden smDown={isMobile()}>
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
                        <CustomIconButton
                            size="small"
                            onClick={handlePickerClick}
                            title="Emoji"
                        >
                            <EmojiEmotionsIcon />
                        </CustomIconButton>
                    </span>
                </ClickAwayListener>
            </Hidden>
            {/* FORCE SPLIT BUTTON */}
            <CustomIconButton
                size="small"
                onClick={props.splitTweetHandler}
                title="Split"
            >
                <ViewAgendaIcon />
            </CustomIconButton>
            {/* CLEAR INPUT BUTTON */}
            <CustomIconButton
                size="small"
                onClick={props.clearTweetHandler}
                title="Clear"
            >
                <BackspaceIcon />
            </CustomIconButton>
        </div>
    );
}
