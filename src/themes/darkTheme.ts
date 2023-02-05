import { ThemeOptions } from "@mui/material";
// import { pink, orange, purple, green } from "@mui/material/colors";

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

export const darkTheme: ThemeOptions = {
  breakpoints: {
    values: {
      mobile: 0, // mobidle width is about 320.
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    // primary: { light: pink[300], main: orange[500], dark: purple[700] },
    // secondary: { light: purple[300], main: purple[500], dark: purple[700] },
    // text: { primary: green[500] }, // all text will become this color.
    mode: "dark",
  },
};
