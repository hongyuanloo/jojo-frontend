import { styled, Typography } from "@mui/material";

export const TypographyTest = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("tablet")]: {
    fontSize: "60px",
  },
}));
