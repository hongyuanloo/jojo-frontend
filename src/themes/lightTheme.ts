import { ThemeOptions } from "@mui/material";
// import { createTheme } from "@mui/material";
// import { orange, pink, purple } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

export const lightTheme: ThemeOptions = {
  breakpoints: {
    values: {
      mobile: 0, // mobidle width is about 320.
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    // use this to change color variants.
    // primary: { light: pink[300], main: orange[500], dark: purple[700] },
    // secondary: { light: purple[300], main: purple[500], dark: purple[700] },

    // use this to change text color.
    // text: { primary: green[500] }, // all text will become this color.
    mode: "light",
  },

  // use below for responsive typography
  typography: {
    // use this to customize variants like h3.
    // h3: {
    // fontSize: "10px", //"1.2rem",
    // "@media (max-width:600px)": {
    //   fontSize: "30px", //"2.5rem",
    // },
    // },
  },
};
