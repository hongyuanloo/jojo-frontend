import { Box, IconButton, useTheme } from "@mui/material";
import DarkIcon from "@mui/icons-material/Brightness4";
import LightIcon from "@mui/icons-material/Brightness7";
import { useContext } from "react";
import { ColorContext } from "../../contexts/ColorContext";

// toggle theme to dark or light mode.
export const SwitchModeButton = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorContext);

  return (
    <Box sx={{ border: "2px solid red" }}>
      {/* {theme.palette.mode} mode */}
      <IconButton
        // sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    </Box>
  );
};
