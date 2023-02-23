import { styled, Card, Typography } from "@mui/material";

export const CardStyled = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: "auto",
}));

export const TypographyStyled = styled(Typography)(({ theme }) => ({
  variant: "body2",
  color: theme.palette.text.secondary,
  textAlign: "center",
  fontSize: "1.25rem",
  [theme.breakpoints.down("tablet")]: {
    fontSize: "1rem",
  },
}));
