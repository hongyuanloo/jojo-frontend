import { CartHeader } from "./CartHeader";
import { CartBody, ICartItem } from "./CartBody";
import { CartSubtotalSummary } from "./CartSubtotalSummary";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { customColors } from "../../themes/customColors";
import { TypographyStyled } from "../../styles/cartContainer";

export const CartContainer = () => {
  //TODO fetch data.
  const data: ICartItem[] = [
    {
      test: "hoho",
      title: "Handmade Fresh Table",
      price: 44,
      images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
      quantity: 2,
    },
    {
      title: "Awesome Rubber Shirt",
      price: 88,
      images: ["https://api.lorem.space/image/watch?w=640&h=480&r=8850"],
      quantity: 1,
    },
    {
      title: "Computadora",
      price: 109,
      images: ["https://api.lorem.space/image?w=640&h=480&r=6098"],
      quantity: 4,
    },
  ];

  // calculate subtotal of all cart items
  function calculateSubtotal() {
    let subTotal = 0;

    data.forEach((item) => {
      const { price, quantity } = item;
      subTotal += price * quantity;
    });

    return subTotal;
  }

  // show button to home if cart is empty
  function ContinueShopping() {
    return (
      <Box textAlign="center" p={2} pb={12}>
        <TypographyStyled pb={1}>You have 0 cart items.</TypographyStyled>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained">CONTINUE SHOPPING</Button>
        </Link>
      </Box>
    );
  }

  return (
    // main cart container
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "top",
        backgroundColor: customColors.light_greyish,
        color: customColors.text_secondary,
        // border: "2px solid red",
        pb: 2,
      }}
    >
      {/* cart header */}
      <CartHeader />

      {/* cart body */}
      {data.length > 0 ? <CartBody cartProducts={data} /> : ContinueShopping()}

      {/* subtotal summary */}
      {data.length > 0 ? (
        <CartSubtotalSummary subtotal={calculateSubtotal()} />
      ) : (
        ""
      )}

      {/* checkout to pay */}
      <Box
        textAlign="right"
        px={4}
        sx={{ paddingBottom: 5 }}
        display={data.length > 0 ? "block" : "none"}
      >
        <Button variant="contained">CHECKOUT</Button>
      </Box>
    </Box>
  );
};
