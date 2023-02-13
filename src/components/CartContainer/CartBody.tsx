import { useReduxSelector } from "../../redux/hooks";
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

export const CartBody = () => {
  // cartItems state from redux store
  const cartItems = useReduxSelector((state) => state.cart.cartItems);
  // console.log("cartItems--", cartItems);

  return (
    //cart body
    <Box sx={{ px: 2 }}>
      <hr />

      {/* map through each item of cartItems  */}
      {cartItems.map((cartItem) => {
        const { title, images, price, categories } = cartItem.product;
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
                        onClick={() => {}}
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
                        onClick={() => {}}
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
                        onClick={() => {}}
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
