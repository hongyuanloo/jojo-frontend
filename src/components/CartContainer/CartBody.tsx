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
import { ICartItem } from "../../types_interfaces";

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

    // update new quantity to newCartItems
    const newCartItems = cartItems.map((cartItem) => {
      const updatedCartItem = { ...cartItem };

      if (cartItem.product.id === productId) {
        upsertObj.quantity = cartItem.quantity + 1;
        updatedCartItem.quantity++;
      }
      return updatedCartItem;
    });

    try {
      // update cartItem in server using upsertObj
      const response = await axiosJWT.post(
        `/users/${userId}/cartitems`,
        upsertObj
      );

      // update cartItem ok, update local cartItems state
      if (response.status === 200) {
        dispatch(updateCartItems({ cartItems: newCartItems }));
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
    let deleteCartItem = true;
    let deleteCartItemIndex = null;

    // update new quantity to newCartItems
    const newCartItems = cartItems.map((cartItem, index) => {
      const { quantity } = cartItem;
      const updatedCartItem: ICartItem = { ...cartItem };

      // if matches, quantity must be >1 in order to minus quantity.
      if (cartItem.product.id === productId) {
        if (quantity > 1) {
          upsertObj.quantity = quantity - 1;
          updatedCartItem.quantity--;
          deleteCartItem = false;
        } else {
          deleteCartItemIndex = index;
        }
      }
      return updatedCartItem;
    });

    // remove cartItem from newCartItems if the qty is 1
    if (deleteCartItem && deleteCartItemIndex !== null) {
      newCartItems.splice(deleteCartItemIndex, 1);
    }

    try {
      // upsert newCartItems with updated qty - 1 to server.
      if (!deleteCartItem) {
        // update cartItem in server using upsertObj
        const response = await axiosJWT.post(
          `/users/${userId}/cartitems`,
          upsertObj
        );

        // update cartItem ok, update local cartItems state
        if (response.status === 200) {
          dispatch(updateCartItems({ cartItems: newCartItems }));
        }
      } else {
        // given userId and productId, delete the productId from cart
        const response = await axiosJWT.delete(
          `/users/${userId}/cartitems/${productId}`
        );

        console.log("--deleted response--", response);
        // update cartItem ok, update local cartItems state
        if (response.status === 200) {
          dispatch(updateCartItems({ cartItems: newCartItems }));
        }
      }
    } catch (error) {
      // handle error
      console.log("--handleClickMinusCartItem-error--", error);
    }

    console.log("--handleClickMinusCartItem--"); //! delete
  }

  // remove productId from cart
  async function handleClickDeleteCartItem(productId: string) {
    let deleteCartItemIndex = null;

    // update find index of productId to delete
    const newCartItems = cartItems.map((cartItem, index) => {
      // if matches, update deleteCartItemIndex
      if (cartItem.product.id === productId) {
        deleteCartItemIndex = index;
      }
      return cartItem;
    });

    // remove cartItem from newCartItems if the qty is 1
    if (deleteCartItemIndex !== null) {
      newCartItems.splice(deleteCartItemIndex, 1);
    }

    try {
      // given userId and productId, delete the productId from cart
      const response = await axiosJWT.delete(
        `/users/${userId}/cartitems/${productId}`
      );

      // deleted cartItem ok, update local cartItems state
      if (response.status === 200) {
        dispatch(updateCartItems({ cartItems: newCartItems }));
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
