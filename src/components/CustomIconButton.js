import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    toolbarButton: {
        marginRight: "0.45em",
        color: theme.palette.secondary.dark,
        "&:hover": {
            color: theme.palette.secondary.main,
        },
    },
}));

export default function CustomIconButton(props) {
    /**
     * Component that applies custom styling to Material UI's
     * IconButton, so that it can be consistently reused in
     * different parts of the app.
     */

    const classes = useStyles();

    const joinClassNames = classNames(props.className, classes.toolbarButton);

    return (
        <IconButton {...props} className={joinClassNames}>
            {props.children}
        </IconButton>
    );
}
