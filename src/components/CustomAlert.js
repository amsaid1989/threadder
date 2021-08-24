import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        width: "30%",
        margin: 0,
        zIndex: 10000,
        left: "35%",
        top: 0,
    },
}));

export default function CustomAlert(props) {
    const classes = useStyles();

    return (
        <Collapse in={props.visible} className={classes.root}>
            <Alert severity={props.severity}>{props.msg}</Alert>
        </Collapse>
    );
}
