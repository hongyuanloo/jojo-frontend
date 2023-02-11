import { styled, Card, Typography } from "@mui/material";

export const CardStyled = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: "auto",
  border: "2px solid green",
  position: "relative",
  zIndex: 1,
}));

export const TypographyStyled = styled(Typography)(({ theme }) => ({
  variant: "body2",
  color: theme.palette.text.secondary,
  textAlign: "center",
  fontSize: "0.9rem",
  [theme.breakpoints.down("tablet")]: {
    fontSize: "0.8rem",
  },
}));
