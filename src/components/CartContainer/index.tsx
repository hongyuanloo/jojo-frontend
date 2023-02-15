import { useEffect, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { updateCartItems } from "../../redux/slices/cartSlice";
import { PleaseLogin } from "./PleaseLogin";
import { CartHeader } from "./CartHeader";
import { CartBody } from "./CartBody";
import { CartSubtotalSummary } from "./CartSubtotalSummary";
import { Box, Button } from "@mui/material";
import { customColors } from "../../themes/customColors";
import { ContinueShopping } from "../OrdersContainer/ContinueShopping";
import { axiosPublic } from "../../requestMethods/axiosPublic";
import { axiosJWT } from "../../requestMethods/axiosJWT";
import { useLocalStorage } from "../customHooks/useLocalStorage";
import { IUser } from "../../types_interfaces";

export const CartContainer = () => {
  //! For development use only.
  // const data1 = [
  //   {
  //     test: "hoho",
  //     title: "Handmade Fresh Table",
  //     price: 44,
  //     images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
  //     quantity: 2,
  //   },
  //   {
  //     title: "Awesome Rubber Shirt",
  //     price: 88,
  //     images: ["https://api.lorem.space/image/watch?w=640&h=480&r=8850"],
  //     quantity: 1,
  //   },
  //   {
  //     title: "Computadora",
  //     price: 109,
  //     images: ["https://api.lorem.space/image?w=640&h=480&r=6098"],
  //     quantity: 4,
  //   },
  // ];

  // init access to local storage
  const [LS_getUser] = useLocalStorage("user");

  // default user state
  const defaultUser: IUser = { id: "", role: "BASIC", username: "" };

  // init user state to data from local storage, or "defaultUser"
  const [user] = useState(LS_getUser() || defaultUser);

  const { id } = user;

  // to dispatch action object to redux store
  const dispatch = useReduxDispatch();
  // cartItems state from redux store
  const cartItems = useReduxSelector((state) => state.cart.cartItems);

  useEffect(() => {
    // if user is logged in (user's id not empty), fetch cart data and update to cartItems state
    async function fetchCartData() {
      try {
        if (id) {
          const { data } = await axiosJWT.get(`/users/${id}/cartitems`);
          // update data to cartItems state
          dispatch(updateCartItems({ cartItems: data.cartItems }));

          // console.log("--fetchCartData--", data);
        }
        return;
      } catch (error) {
        console.log("--fetch /products error --", error);
      }
    }
    fetchCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // calculate subtotal for all cart items
  function calculateSubtotal() {
    let subTotal = 0;

    cartItems.forEach((cartItem) => {
      const { product, quantity } = cartItem;
      subTotal += product.price * quantity;
    });
    return subTotal;
  }

  async function handleClickCheckout() {
    try {
      //TODO convert to axiosJWT
      // console.log("--cartItems--", cartItems);
      //post "cartItems"
      const { data } = await axiosPublic.post(
        `users/${user?.id}/create-checkout-session`, // `/users/c742ac1e-79a5-4335-b41b-c10c8a91059f/create-checkout-session`
        { cartItems }
      );

      //reroute to received session url
      if (data.url) window.location = data.url;

      console.log("--handleClickCheckout--", data);
    } catch (error) {
      //
      console.log("--handleClickCheckout-error--", error);
    }
  }

  return (
    // main cart container1
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

      {/* If user is not login, prompt user to login. */}
      {!id && <PleaseLogin parameter="cart items" />}

      {/* cart body */}
      {cartItems.length > 0 && id ? (
        <CartBody />
      ) : (
        <ContinueShopping parameter="cart items" />
      )}

      {/* subtotal summary */}
      {cartItems.length > 0 && id ? (
        <CartSubtotalSummary subtotal={calculateSubtotal()} />
      ) : (
        ""
      )}

      {/* checkout to pay */}
      <Box
        textAlign="right"
        px={4}
        sx={{ paddingBottom: 5 }}
        display={cartItems.length > 0 && id ? "block" : "none"}
      >
        <Button variant="contained" onClick={handleClickCheckout}>
          CHECKOUT
        </Button>
      </Box>
    </Box>
  );
};
