import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import {
  Box,
  Stack,
  Avatar,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { TypographyStyled } from "../../styles/cartContainer";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { customColors } from "../../themes/customColors";
import { axiosJWT } from "../../requestMethods/axiosJWT";
import { useLocalStorage } from "../customHooks/useLocalStorage";
import { updateCartItems } from "../../redux/slices/cartSlice";

export const CartBody = () => {
  const [LS_getUser] = useLocalStorage("user");

  const userId = LS_getUser()?.id;

  // to dispatch action object to redux store
  const dispatch = useReduxDispatch();
  // cartItems state from redux store
  const cartItems = useReduxSelector((state) => state.cart.cartItems);

  async function handleClickUpsertCartItem(productId: string) {
    // init upsertObj
    const upsertObj = { productId, quantity: 1 };

    // if productId found in cartItems, update upsertObj with new quantity.
    cartItems.forEach((cartItem) => {
      if (cartItem.product.id === productId) {
        upsertObj.quantity = cartItem.quantity + 1;
      }
    });

    try {
      // update cartItem in server using upsertObj
      const response = await axiosJWT.post(
        `/users/${userId}/cartitems`,
        upsertObj
      );

      // update cartItem ok
      if (response.status === 200) {
        // fetch updated cartItems
        const { data } = await axiosJWT.get(`/users/${userId}/cartitems`);
        // update new cartItems to cartItems state
        dispatch(updateCartItems({ cartItems: data.cartItems }));
      }
    } catch (error) {
      // handle error.
      console.log("--handleClickUpsertCartItem-error--", error);
    }
  }

  // if qty of productId >1, qty-- else remove it from cart.
  async function handleClickMinusCartItem(productId: string) {
    // init upsertObj
    const upsertObj = { productId, quantity: 1 };
    /**   flag to check if this product has quantity of 1.
     *    if yes, delete it. if no, quantity minus - 1    */
    let deleteCartItemIndex = null;

    // update new quantity to newCartItems
    cartItems.forEach((cartItem, index) => {
      const { quantity } = cartItem;
      // const updatedCartItem: ICartItem = { ...cartItem };

      // if matches, quantity must be >1 in order to minus quantity.
      if (cartItem.product.id === productId) {
        if (quantity > 1) {
          upsertObj.quantity = quantity - 1;
        } else {
          deleteCartItemIndex = index;
        }
      }
    });

    try {
      // upsert newCartItems with updated qty - 1 to server.
      let response;
      if (deleteCartItemIndex === null) {
        // update cartItem in server using upsertObj
        response = await axiosJWT.post(`/users/${userId}/cartitems`, upsertObj);
      } else {
        // given userId and productId, delete productId from cart in server
        response = await axiosJWT.delete(
          `/users/${userId}/cartitems/${productId}`
        );
      }

      // update cartItem ok, update local cartItems state
      if (response.status === 200) {
        // fetch updated cartItems
        const { data } = await axiosJWT.get(`/users/${userId}/cartitems`);
        // update new cartItems to cartItems state
        dispatch(updateCartItems({ cartItems: data.cartItems }));
      }
    } catch (error) {
      // handle error
      console.log("--handleClickMinusCartItem-error--", error);
    }
  }

  // remove productId from cart
  async function handleClickDeleteCartItem(productId: string) {
    let deleteCartItemIndex = null;

    // update find index of productId to delete
    cartItems.forEach((cartItem, index) => {
      // if matches, update deleteCartItemIndex
      if (cartItem.product.id === productId) {
        deleteCartItemIndex = index;
      }
    });

    // if cant find item to delete, return
    if (deleteCartItemIndex === null) return;

    try {
      // given userId and productId, delete the productId from cart
      const response = await axiosJWT.delete(
        `/users/${userId}/cartitems/${productId}`
      );

      // deleted cartItem ok, fetch new cartItems and update local cartItems state
      if (response.status === 200) {
        // fetch updated cartItems
        const { data } = await axiosJWT.get(`/users/${userId}/cartitems`);
        // update new cartItems to cartItems state
        dispatch(updateCartItems({ cartItems: data.cartItems }));
      }
    } catch (error) {
      // handle error
      console.log("--handleClickMinusCartItem-error--", error);
    }
  }

  return (
    //cart body
    <Box sx={{ px: 2 }}>
      <hr />

      {/* map through each item of cartItems  */}
      {cartItems.map((cartItem) => {
        const {
          title,
          images,
          price,
          categories,
          id: productId,
        } = cartItem.product;
        return (
          <div key={title}>
            {/* cart item container*/}
            <Grid container>
              {/* left and mid sides cart item */}
              <Grid container mobile={8} tablet={9.5}>
                {/* left side cart item */}
                <Grid
                  item
                  py={1}
                  mobile={12}
                  tablet={8}
                  sx={{
                    display: "flex",
                    gap: "8px",
                    flexDirection: { mobile: "column", tablet: "row" },
                  }}
                >
                  {/* colum1: image */}
                  <Avatar
                    variant="square"
                    alt={title}
                    sx={{ width: 60, height: 60 }}
                    src={images[0]}
                  />

                  {/* colum2: product details - title, category, price, del icon */}
                  <Stack>
                    <TypographyStyled fontWeight={600}>
                      {title}
                    </TypographyStyled>
                    <TypographyStyled>
                      {`Category: ${categories[0]}`}
                    </TypographyStyled>
                    <TypographyStyled>{`SGD: ${price}.00`}</TypographyStyled>

                    <Box>
                      <IconButton
                        aria-label="delete item"
                        onClick={() => {
                          handleClickDeleteCartItem(productId);
                        }}
                        sx={{
                          padding: 0,
                          opacity: 0.7,
                        }}
                      >
                        <DeleteForeverOutlinedIcon
                          fontSize="medium"
                          sx={{ color: customColors.text_secondary }}
                        />
                      </IconButton>
                    </Box>
                  </Stack>
                </Grid>

                {/* middle side cart item */}
                <Grid
                  item
                  py={1}
                  mobile={6}
                  tablet={4}
                  sx={{ justifyContent: "flex-start" }}
                >
                  <Stack sx={{ alignItems: "center" }}>
                    <TypographyStyled fontWeight={600}>
                      {"Quantity: "}
                    </TypographyStyled>

                    <Stack
                      sx={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        aria-label="add item"
                        onClick={() => {
                          handleClickUpsertCartItem(productId);
                        }}
                        sx={{ opacity: 0.7 }}
                      >
                        <AddBoxOutlinedIcon
                          fontSize="medium"
                          sx={{ color: customColors.text_secondary }}
                        />
                      </IconButton>
                      <Typography
                        sx={{
                          fontSize: "1.1rem",
                          width: "30px",
                          textAlign: "center",
                        }}
                      >
                        {cartItem.quantity}
                      </Typography>
                      <IconButton
                        aria-label="minus item"
                        onClick={() => {
                          handleClickMinusCartItem(productId);
                        }}
                        sx={{ opacity: 0.7 }}
                      >
                        <IndeterminateCheckBoxOutlinedIcon
                          fontSize="medium"
                          sx={{ color: customColors.text_secondary }}
                        />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>

              {/* right side cart item */}
              <Grid
                item
                py={1}
                mobile={4}
                tablet={2.5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <TypographyStyled fontWeight={600}>{"Total:"}</TypographyStyled>
                <TypographyStyled pt={1}>
                  {`SGD ${price * cartItem.quantity}.00`}
                </TypographyStyled>
              </Grid>
            </Grid>
            <hr />
          </div>
        );
      })}
    </Box>
  );
};
