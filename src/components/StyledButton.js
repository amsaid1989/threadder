import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Button from "@material-ui/core/Button";

/**
 * A component that applies custom styling to Material UI's
 * default Button component. It passes all the props added
 * to it to the enclosed Button component.
 */

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

    /*
     * Since the custom styling is applied by passing a class
     * to the className prop, which only accepts one class,
     * we use the classNames NPM package to merge the custom
     * styling class with any classes passed by someone using
     * the component who might want to further customise its
     * display.
     */
    const allClasses = classNames(props.className, classes.styledButton);

    return <Button {...props} className={allClasses} />;
}
