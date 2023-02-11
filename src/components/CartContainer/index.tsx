import {
  Box,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { customColors } from "../../themes/customColors";
import {
  SubtotalBoxStyled,
  SubtotalPriceStyled,
  SubtotalTextStyled,
  TypographyStyled,
} from "../../styles/cartContainer";

export const CartContainer = () => {
  //TODO fetch data.
  const data = [
    {
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
    {
      title: "Gorgeous Rubber Hat",
      price: 22,
      images: ["https://api.lorem.space/image?w=640&h=480&r=3441"],
      quantity: 9,
    },
    {
      title: "Intelligent Granite Mouse",
      price: 451,
      images: ["https://api.lorem.space/image/watch?w=640&h=480&r=6515"],
      quantity: 14,
    },
  ];

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
      <Typography
        variant="h5"
        my={3}
        color={customColors.text_secondary}
        textAlign="center"
      >
        My Cart
      </Typography>

      {/* cart body */}
      <Box sx={{ px: 2 }}>
        <hr />
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
                alt={data[0].title}
                sx={{ width: 60, height: 60 }}
                src={data[0].images[0]}
              />

              {/* colum2: product details - title, category, price, del icon */}
              <Stack>
                <TypographyStyled fontWeight={600}>
                  {data[0].title}
                </TypographyStyled>
                <TypographyStyled>
                  {"Category: {cartItem.category}"}
                </TypographyStyled>
                <TypographyStyled>
                  {`SGD: ${data[0].price}.00`}
                </TypographyStyled>

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
                    {data[0].quantity}
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
            <TypographyStyled>
              {`SGD ${data[0].price * data[0].quantity}.00`}
            </TypographyStyled>
          </Grid>
        </Grid>
        <hr />
      </Box>

      {/* subtotal summary */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          py: 2,
          px: 3,
          gap: "8px",
          //   border: "2px solid red",
        }}
      >
        {/* Subtotal */}
        <SubtotalBoxStyled>
          <SubtotalTextStyled>Subtotal:</SubtotalTextStyled>
          <SubtotalPriceStyled>SGD 123100.00</SubtotalPriceStyled>
        </SubtotalBoxStyled>

        {/* Discount */}
        <SubtotalBoxStyled>
          <SubtotalTextStyled>Discount:</SubtotalTextStyled>
          <SubtotalPriceStyled>SGD 00.00</SubtotalPriceStyled>
        </SubtotalBoxStyled>

        {/* Grand total */}
        <SubtotalBoxStyled>
          <SubtotalTextStyled>Grand total:</SubtotalTextStyled>
          <SubtotalPriceStyled sx={{ fontSize: "1.1rem", fontWeight: 800 }}>
            SGD 123100.00
          </SubtotalPriceStyled>
        </SubtotalBoxStyled>
      </Box>

      <Box textAlign="right" px={4} sx={{ paddingBottom: 5 }}>
        <Button variant="contained">CHECKOUT</Button>
      </Box>
    </Box>
  );
};
