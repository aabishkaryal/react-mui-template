import { createTheme } from "@mui/material";

export default createTheme({
  direction: "ltr",
  palette: {
    mode: "dark",
    primary: {
      main: "#5D87FF",
      light: "#4570EA",
      dark: "#ECF2FF",
    },
    secondary: {
      main: "#49BEFF",
      light: "#23afdb",
      dark: "#E8F7FF",
    },
    success: {
      main: "#13DEB9",
      light: "#02b3a9",
      dark: "#E6FFFA",
      contrastText: "#000000",
    },
    info: {
      main: "#539BFF",
      light: "#1682d4",
      dark: "#EBF3FE",
      contrastText: "#000000",
    },
    error: {
      main: "#FA896B",
      light: "#f3704d",
      dark: "#FDEDE8",
      contrastText: "#000000",
    },
    warning: {
      main: "#FFAE1F",
      light: "#ae8e59",
      dark: "#FEF5E5",
      contrastText: "#000000",
    },
    grey: {
      100: "#1A1A1A",
      200: "#2A2A2A",
      300: "#3A3A3A",
      400: "#7C7C7C",
      500: "#9A9A9A",
      600: "#B0B0B0",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#A0A0A0",
    },
    action: {
      disabledBackground: "rgba(255,255,255,0.12)",
      hoverOpacity: 0.08,
      hover: "#424242",
    },
    divider: "#424242",
  },
  typography: {
    fontFamily:
      "Roboto, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;",
    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.3125rem",
      lineHeight: "1.6rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "1.6rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.2rem",
    },
    button: {
      textTransform: "capitalize",
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.334rem",
    },
    body2: {
      fontSize: "0.75rem",
      letterSpacing: "0rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
});
