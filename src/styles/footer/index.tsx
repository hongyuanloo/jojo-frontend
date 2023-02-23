import { Link } from "react-router-dom";
import { Box, List, styled, Typography, Grid } from "@mui/material";
import { customColors } from "../../themes/customColors";

export const FooterContainer = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  padding: "56px",
  background: customColors.dark_blueish,
  color: customColors.light_greyish,
  [theme.breakpoints.down("tablet")]: {
    fontSize: "12px",
    padding: "64px 32px",
  },
}));

export const FooterTitle = styled(Typography)(() => ({
  // textTransform: "uppercase",
  color: customColors.light_greyish,
  fontWeight: 500,
  fontSize: "1.3rem",
  lineHeight: 2,
  letterSpacing: "0.033em",
  margin: "1em 0",
}));

export const FooterLink = styled(Link)({
  textDecoration: "none",
  color: customColors.light_greyish,
});

export const FooterText = styled(Typography)(({ theme }) => ({
  color: customColors.light_greyish,
  fontSize: "0.75rem",
  lineHeight: 2,
  [theme.breakpoints.up("tablet")]: { fontSize: "0.875rem" },
}));

export const ListContainer = styled(List)({
  padding: 0,
});

export const GridItemContainer = styled(Grid)(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.down("tablet")]: { textAlign: "center" },
}));

export const AboutUsText = styled("p")(({ theme }) => ({
  color: customColors.light_greyish,
  // caption variant
  fontWeight: 400,
  fontSize: "0.75rem",
  lineHeight: 1.66,
  letterSpacing: "0.033em",
  paddingBottom: "32px",
  [theme.breakpoints.up("tablet")]: { fontSize: "0.875rem" },
}));
