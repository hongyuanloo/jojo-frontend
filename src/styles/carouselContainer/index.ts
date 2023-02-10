import { styled } from "@mui/material";

export const ImgStyled = styled("img")(({ theme }) => ({
  [theme.breakpoints.up("tablet")]: {
    maxWidth: "640px",
  },
  [theme.breakpoints.down("tablet")]: {
    maxWidth: "320px",
  },
}));
