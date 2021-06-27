import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LoggedInMenu from "./LoggedInMenu";

const useStyles = makeStyles((theme) => ({
    buttons: {
        borderRadius: "0.15rem",
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
        <Button
            variant="contained"
            color="secondary"
            className={classes.buttons}
            onClick={logIn}
        >
            Log in
        </Button>
    );

    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                    Threadder
                </Typography>
                {props.loggedIn ? <LoggedInMenu /> : logInBtn}
            </Toolbar>
        </AppBar>
    );
}
