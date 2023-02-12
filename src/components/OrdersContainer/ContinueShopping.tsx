import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { TypographyStyled } from "../../styles/cartContainer";

interface Iparameter {
  parameter: "orders" | "cart items";
}

// show button to home if orders/cart items is empty
export const ContinueShopping = ({ parameter }: Iparameter) => {
  return (
    <Box textAlign="center" p={2} pb={12}>
      <TypographyStyled pb={1}>{`You have 0 ${parameter}.`}</TypographyStyled>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained">CONTINUE SHOPPING</Button>
      </Link>
    </Box>
  );
};
