import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import StyledButton from "./StyledButton";
import LoggedInMenu from "./LoggedInMenu";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        padding: "1em 1.5em",
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header(props) {
    const classes = useStyles();

    const logIn = () => {
        // TODO: Implement
        console.log("logging in");
    };

    const logInBtn = (
        <StyledButton variant="contained" color="secondary" onClick={logIn}>
            Log in
        </StyledButton>
    );

    return (
        <AppBar position="relative">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Threadder
                </Typography>
                {props.loggedIn ? <LoggedInMenu /> : logInBtn}
            </Toolbar>
        </AppBar>
    );
}
