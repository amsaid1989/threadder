import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";

/**
 * Component that applies custom styling to Material UI's
 * Menu component. It passes all of its props to the
 * enclosed Menu component.
 */

const useStyles = makeStyles((theme) => ({
    menuList: {
        border: `solid 1px ${theme.palette.primary.dark}`,
    },
}));

export default function StyledMenu(props) {
    const classes = useStyles();

    const menuClasses = {
        paper: classes.menuList,
    };

    return <Menu classes={menuClasses} {...props} />;
}
