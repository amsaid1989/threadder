import { useState } from "react";
import { useCookies } from "react-cookie";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import StyledMenu from "./StyledMenu";
import MenuItem from "@material-ui/core/MenuItem";
import { logout } from "../controllers/APICalls";

/*
 * The styles and implementation of the menu component that
 * is rendered when the user is logged in to their Twitter
 * account.
 */

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

    /* COMPONENT STATE */
    // Generate the anchor element which will be used to trigger the menu
    const [anchorEl, setAnchorEl] = useState(null);
    /* END COMPONENT STATE */

    const [cookie] = useCookies(["user"]);

    /* EVENT HANDLERS */
    const handleAvatarClick = (event) => {
        /*
         * This is used to set the Avatar as an anchor element for the
         * menu. In effect, it expands the menu whenever the Avatar is
         * clicked by the user.
         */

        // Use currentTarget instead of target to ensure that it grabs
        // the parent div rather than any of the child elements
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const redirectToTwitter = () => {
        /*
         * Handles the click event for the Go to Twitter menu
         * item, redirecting the logged-in user to their Twitter
         * profile
         */

        closeMenu();

        const screenName = cookie.user.screenName;

        document.location.href = `https://twitter.com/${screenName}`;
    };

    const logOutHandler = () => {
        /*
         * Handles the click event for the Logout menu item
         */

        closeMenu();

        logout()
            .then(() => {
                props.setLoggedOutState();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    /* END EVENT HANDLERS */

    return (
        <Box>
            <IconButton size="small" onClick={handleAvatarClick}>
                <Avatar
                    src={props.user.profileImage}
                    alt={`${props.user.name} profile picture`}
                />
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

                <MenuItem className={classes.menuItem} onClick={logOutHandler}>
                    Log out
                </MenuItem>
            </StyledMenu>
        </Box>
    );
}
