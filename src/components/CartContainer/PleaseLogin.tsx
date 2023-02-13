import { Box } from "@mui/material";
import { TypographyStyled } from "../../styles/cartContainer";

interface Iparameter {
  parameter: "orders" | "cart items";
}

// show button to home if orders/cart items is empty
export const PleaseLogin = ({ parameter }: Iparameter) => {
  return (
    <Box textAlign="center" color="red">
      <TypographyStyled>{`Login to view ${parameter}.`}</TypographyStyled>
    </Box>
  );
};
