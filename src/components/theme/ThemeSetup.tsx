import {
  ThemeProvider,
  CssBaseline,
  PaletteMode,
  createTheme,
} from "@mui/material";
import { ColorContextProvider } from "../../contexts/ColorContext";
import { useState, useMemo } from "react";
import { getTheme } from "../../themes";

interface IThemeSetupProps {
  children: React.ReactNode;
}

export const ThemeSetup = ({ children }: IThemeSetupProps) => {
  const [mode, setMode] = useState<PaletteMode>("dark");

  // colorMode returns populated IColorContextSchema
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  // get theme based on mode selected.
  const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

  return (
    <ColorContextProvider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ColorContextProvider>
  );
};
