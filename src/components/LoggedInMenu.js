import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import StyledMenu from "./StyledMenu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
    menuList: {
        border: `solid 1px ${theme.palette.primary.dark}`,
    },
    menuItem: {
        color: theme.palette.primary.contrastText,
        "&:hover": {
            color: theme.palette.secondary.contrastText,
            backgroundColor: theme.palette.secondary.main,
        },
    },
}));

export default function LoggedInMenu(props) {
    const classes = useStyles();

    // Generate the anchor element which will be used to trigger the menu
    const [anchorEl, setAnchorEl] = useState(null);

    const handleAvatarClick = (event) => {
        // Use currentTarget instead of target to ensure that it grabs
        // the parent div rather than any of the child elements
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const redirectToTwitter = () => {
        closeMenu();

        // TODO: Implement
        console.log("redirecting to twitter");
    };

    const logOut = () => {
        closeMenu();

        // TODO: Implement
        console.log("logging out");
    };

    return (
        <Box>
            <IconButton size="small" onClick={handleAvatarClick}>
                <Avatar />
            </IconButton>
            <StyledMenu
                id="account-settings-menu"
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                anchorReference="anchorEl"
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                transformOrigin={{ horizontal: "center", vertical: "top" }}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
                autoFocus={false}
            >
                <MenuItem
                    className={classes.menuItem}
                    onClick={redirectToTwitter}
                >
                    Go to Twitter
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={logOut}>
                    Log out
                </MenuItem>
            </StyledMenu>
        </Box>
    );
}
