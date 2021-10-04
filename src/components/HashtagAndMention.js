import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.secondary.main,
    },
}));

export default function HashtagAndMention(props) {
    const classes = useStyles();

    return <strong className={classes.root}>{props.text}</strong>;
}
