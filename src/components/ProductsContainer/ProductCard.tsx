import { Grid, CardMedia, CardActionArea, IconButton } from "@mui/material";
import { CardStyled, TypographyStyled } from "../../styles/productsContainer";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Box } from "@mui/system";
import { IProduct } from "../../types_interfaces";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { axiosJWT } from "../../requestMethods/axiosJWT";
import { updateCartItems } from "../../redux/slices/cartSlice";
import { useLocalStorage } from "../customHooks/useLocalStorage";

export const ProductCard = ({ product }: { product: IProduct }) => {
  const { title, price, images } = product;

  // init access to local storage.
  const [LS_getUser] = useLocalStorage("user");

  // get userId from local storage
  const userId = LS_getUser()?.id;

  // to dispatch action object to redux store
  const dispatch = useReduxDispatch();
  // cartItems state from redux store
  const cartItems = useReduxSelector((state) => state.cart.cartItems);

  //given userId and productId, upsert item to cart. Then update cartItems state
  async function handleClickAddToCart(productId: string) {
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
      console.log("--handleClickAddToCart-error--", error);
    }
  }

  return (
    // Container for one product card
    <Grid
      item
      mobile={6}
      tablet={4}
      // sx={{ border: "2px solid red" }}
      padding={1}
    >
      {/* Card container */}
      <CardStyled>
        {/* add to cart button */}
        <IconButton
          aria-label="add to cart"
          // add item to cart only if user is login.
          onClick={() => userId && handleClickAddToCart(product.id)}
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            zIndex: 99,
          }}
        >
          <AddCircleOutlinedIcon
            sx={{
              fontSize: {
                mobile: "2rem",
                tablet: "3rem",
              },
              border: "2px solid red",
            }}
          />
        </IconButton>

        {/* button wrapping img */}
        <CardActionArea
          onClick={() => {
            console.log("image");
          }}
        >
          {/* card image */}
          <CardMedia
            component="img"
            image={images[0]}
            alt="green iguana"
            sx={{ height: { tablet: "260px", mobile: "180px" } }}
          />
        </CardActionArea>

        {/* card text */}
        <Box sx={{ padding: 1 }}>
          {/* noWrap truncates text longer than container. */}
          <TypographyStyled noWrap={true}>{title}</TypographyStyled>
          <TypographyStyled>{`$ ${price}`}</TypographyStyled>
        </Box>
      </CardStyled>
    </Grid>
  );
};
