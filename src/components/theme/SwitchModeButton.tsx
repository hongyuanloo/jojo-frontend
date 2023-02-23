import { Box, IconButton, useTheme } from "@mui/material";
import DarkIcon from "@mui/icons-material/Brightness4";
import LightIcon from "@mui/icons-material/Brightness7";
import { useContext } from "react";
import { ColorContext } from "../../contexts/ColorContext";
import { customColors } from "../../themes/customColors";

// toggle theme to dark or light mode.
export const SwitchModeButton = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorContext);

  return (
    <Box>
      <IconButton
        onClick={colorMode.toggleColorMode}
        sx={{ color: customColors.light_greyish }}
      >
        {theme.palette.mode === "dark" ? <DarkIcon /> : <LightIcon />}
      </IconButton>
    </Box>
  );
};
