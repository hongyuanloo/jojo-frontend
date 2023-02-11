import { Grid, CardMedia, CardActionArea, IconButton } from "@mui/material";
import { CardStyled, TypographyStyled } from "../../styles/productsContainer";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Box } from "@mui/system";

interface IproductInfo {
  title: string;
  price: number;
  images: string[];
}

export const ProductCard = (productInfo: IproductInfo) => {
  const { title, price, images } = productInfo;

  //TODO handleClickAddToCart

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
          onClick={() => {
            console.log("button");
          }}
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
            sx={{ height: { tablet: "180px", mobile: "140px" } }}
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
