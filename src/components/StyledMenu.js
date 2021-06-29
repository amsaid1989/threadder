import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
    menuList: {
        border: `solid 1px ${theme.palette.primary.dark}`,
    },
}));

// Component that applies custom styling to Material UI's
// Menu component
export default function StyledMenu(props) {
    const classes = useStyles();

    const menuClasses = {
        paper: classes.menuList,
    };

    return <Menu classes={menuClasses} {...props} />;
}
