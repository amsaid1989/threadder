import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        "&:link": {
            color: theme.palette.secondary.main,
        },
        "&:visited": {
            color: theme.palette.secondary.dark,
        },
        "&:hover": {
            color: theme.palette.secondary.hover,
        },
        "&:active": {
            color: theme.palette.secondary.light,
        },
    },
}));

export default function CustomURL(props) {
    const classes = useStyles();

    return (
        <a
            href={props.url}
            target="_blank"
            rel="noreferrer"
            className={classes.root}
        >
            {props.url}
        </a>
    );
}
