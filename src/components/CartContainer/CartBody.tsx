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

interface ICartProducts {
  cartProducts: ICartItem[];
}

export interface ICartItem {
  [key: string]: any; // any other properties is allowed too.
  title: string;
  price: number;
  images: string[];
  quantity: number;
}

export const CartBody = ({ cartProducts }: ICartProducts) => {
  // console.log("cartProducts--", cartProducts);

  return (
    //cart body
    <Box sx={{ px: 2 }}>
      <hr />

      {/* map through each item of cartProducts  */}
      {cartProducts.map((cartItem) => {
        return (
          <div key={cartItem.title}>
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
                    alt={cartItem.title}
                    sx={{ width: 60, height: 60 }}
                    src={cartItem.images[0]}
                  />

                  {/* colum2: product details - title, category, price, del icon */}
                  <Stack>
                    <TypographyStyled fontWeight={600}>
                      {cartItem.title}
                    </TypographyStyled>
                    <TypographyStyled>
                      {"Category: {cartItem.category}"}
                    </TypographyStyled>
                    <TypographyStyled>{`SGD: ${cartItem.price}.00`}</TypographyStyled>

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
                  {`SGD ${cartItem.price * cartItem.quantity}.00`}
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
