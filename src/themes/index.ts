import { PaletteMode } from "@mui/material";
import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";

export const getTheme = (mode: PaletteMode) =>
  mode === "light" ? lightTheme : darkTheme;
