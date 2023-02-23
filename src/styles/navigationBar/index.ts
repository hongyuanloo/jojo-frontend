import { styled, Typography, IconButton, Box } from "@mui/material";
import { customColors } from "../../themes/customColors";

// NavigationBar Main container.
export const BoxStyled = styled(Box)(({ theme }) => ({
  position: "sticky",
  backgroundColor: customColors.dark_blueish,
  padding: "16px 24px",
  top: 0,
  zIndex: 99,
  [theme.breakpoints.down("tablet")]: {
    padding: "8px 16px",
  },
}));

// styling LOGO's text
export const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  color: customColors.light_greyish,
  [theme.breakpoints.down("tablet")]: {
    display: "none",
  },
}));

export const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  color: customColors.light_greyish,
}));
