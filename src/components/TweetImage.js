import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import CustomIconButton from "./CustomIconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        width: "100%",
        minHeight: "100%",
        maxHeight: "100%",
    },
    deleteButton: {
        padding: 0,
        margin: 0,
        position: "absolute",
        right: "6px",
        top: "6px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    iconBackground: {
        position: "absolute",
        minWidth: "65%",
        maxWidth: "65%",
        minHeight: "65%",
        maxHeight: "65%",
        backgroundColor: "black",
        borderRadius: "1em",
    },
    buttonIcon: {
        zIndex: 900,
        scale: 1.2,
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
}));

export default function TweetImage(props) {
    const classes = useStyles();

    return (
        <div
            className={classes.root}
            style={{ gridColumn: props.gridColumn, gridRow: props.gridRow }}
        >
            <CustomIconButton size="small" className={classes.deleteButton}>
                <span className={classes.iconBackground} />
                <CancelIcon className={classes.buttonIcon} />
            </CustomIconButton>

            <img
                src={props.imageSource}
                alt={props.altText}
                className={classes.image}
            />
        </div>
    );
}
