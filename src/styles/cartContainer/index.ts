import { Box, styled, Typography } from "@mui/material";

// all text used in cart items
export const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
}));

// container for each row of subtotal summary
export const SubtotalBoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

// text style for subtotal text.
export const SubtotalTextStyled = styled(Typography)(({ theme }) => ({
  minWidth: "90px",
  fontWeight: 600,
}));

// text style for subtotal price.
export const SubtotalPriceStyled = styled(Typography)(({ theme }) => ({
  textAlign: "right",
  minWidth: "150px",
}));
