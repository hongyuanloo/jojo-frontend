import { Box, styled } from "@mui/material";

export const ImgStyled = styled("img")(({ theme }) => ({
  [theme.breakpoints.up("tablet")]: {
    maxWidth: "640px",
    height: "640px",
  },
  [theme.breakpoints.down("tablet")]: {
    maxWidth: "320px",
    height: "320px",
  },
}));

export const ImgContainerStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "black",
  overflow: "hidden", // hide scrollbar appeared during transition.
  [theme.breakpoints.up("tablet")]: {
    height: "640px",
  },
  [theme.breakpoints.down("tablet")]: {
    height: "320px",
  },
}));
