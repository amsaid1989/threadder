import { createMuiTheme } from "@material-ui/core/styles";

/*
 * Threadder's main theme
 */

const primaryPalette = {
    main: "#283845",
    light: "#395164",
    dark: "#22303c",
    contrastText: "#ffffff",
    contrastText2: "#e5e5e5",
};

const secondaryPalette = {
    main: "#ffc107",
    light: "#ffd147",
    dark: "#c97d02",
    hover: "#ffa042",
    inactive: "#432a01",
    contrastText: "#14213d",
    inactiveText: "#111111",
};

const backgroundPalette = {
    paper: primaryPalette.light,
    default: "#202c39",
};

const darkTheme = createMuiTheme({
    palette: {
        primary: primaryPalette,
        secondary: secondaryPalette,
        background: backgroundPalette,
    },
    spacing: 4,
    shape: {
        borderRadius: 2,
    },
});

export default darkTheme;
