import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    styledButton: {
        "&:disabled": {
            color: theme.palette.secondary.inactiveText,
            backgroundColor: theme.palette.secondary.inactive,
        },
        "&:hover": {
            backgroundColor: theme.palette.secondary.hover,
        },
    },
}));

export default function StyledButton(props) {
    const classes = useStyles();

    const allClasses = classNames(props.className, classes.styledButton);

    return <Button {...props} className={allClasses} />;
}
