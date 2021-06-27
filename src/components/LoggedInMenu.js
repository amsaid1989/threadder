import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// Avatar component custom styles
const avatarStyles = makeStyles((theme) => ({
    root: {
        borderRadius: "0.15rem",
        "&:hover": {
            cursor: "pointer",
        },
    },
}));

// Menu component custom styles
const menuStyles = makeStyles((theme) => ({
    paper: {
        border: `solid 1px ${theme.palette.primary.dark}`,
        backgroundColor: theme.palette.primary.main,
    },
    list: {
        color: theme.palette.background.default,
    },
}));

// MenuItem component custom styles
const menuItemStyles = makeStyles((theme) => ({
    root: {
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
        },
    },
}));

export default function LoggedInMenu(props) {
    // Generate all the custom classes for the components
    const avatarClasses = avatarStyles();
    const menuClasses = menuStyles();
    const menuItemClasses = menuItemStyles();

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
            <Avatar
                variant="rounded"
                classes={avatarClasses}
                onClick={handleAvatarClick}
            />
            <Menu
                id="account-settings-menu"
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                anchorReference="anchorEl"
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                transformOrigin={{ horizontal: "center", vertical: "top" }}
                open={Boolean(anchorEl)}
                classes={menuClasses}
                onClose={closeMenu}
                autoFocus={false}
            >
                <MenuItem classes={menuItemClasses} onClick={redirectToTwitter}>
                    Go to Twitter
                </MenuItem>
                <MenuItem classes={menuItemClasses} onClick={logOut}>
                    Log out
                </MenuItem>
            </Menu>
        </Box>
    );
}
