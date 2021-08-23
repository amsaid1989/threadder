import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyles = makeStyles((theme) => ({
    dialogText: {
        color: theme.palette.primary.contrastText,
        textAlign: "center",
    },
}));

export default function MessagesDialog(props) {
    const classes = useStyles();

    return (
        <Dialog open={props.open}>
            <DialogContent>
                <DialogContentText className={classes.dialogText}>
                    {props.msg}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
