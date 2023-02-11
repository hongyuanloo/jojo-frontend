import { AppBar, styled, Typography, IconButton } from "@mui/material";
import { customColors } from "../../themes/customColors";

// NavigationBar Main container.
export const AppBarStyled = styled(AppBar)(({ theme }) => ({
  position: "sticky",
  backgroundColor: customColors.turkish,
  padding: "16px 24px",

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
