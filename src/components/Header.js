import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import StyledButton from "./StyledButton";
import LoggedInMenu from "./LoggedInMenu";

/*
 * The styles and implementation of the app Header component.
 * It shows the app name, logo and a sign in button to allow
 * the user to log into their Twitter account.
 * When logged in, it replaces the sign in button with the
 * Twitter profile photo of the user and a menu that allows
 * them to navigate to their Twitter account directly from
 * the app or to log out.
 */

const useStyles = makeStyles((theme) => ({
    toolbar: {
        height: "1em",
        padding: "1em 1.5em",
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header(props) {
    const classes = useStyles();

    // The sign in StyledButton component
    const logInBtn = (
        <StyledButton
            variant="contained"
            color="secondary"
            onClick={props.login}
        >
            Log in
        </StyledButton>
    );

    return (
        <AppBar position="relative">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Threadder
                </Typography>
                {props.loggedIn ? (
                    <LoggedInMenu
                        user={props.user}
                        setLoggedOutState={props.setLoggedOutState}
                    />
                ) : (
                    logInBtn
                )}
            </Toolbar>
        </AppBar>
    );
}
