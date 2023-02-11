import { Container, Typography, Grid } from "@mui/material";
import { customColors } from "../../themes/customColors";
import { ProductCard } from "./ProductCard";

export const ProductsContainer = () => {
  //TODO fetch data.
  const data = [
    {
      title: "Handmade Fresh Table",
      price: 44,
      images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
    },
    {
      title: "Awesome Rubber Shirt",
      price: 88,
      images: ["https://api.lorem.space/image/watch?w=640&h=480&r=8850"],
    },
    {
      title: "Computadora",
      price: 109,
      images: ["https://api.lorem.space/image?w=640&h=480&r=6098"],
    },
    {
      title: "Gorgeous Rubber Hat",
      price: 22,
      images: ["https://api.lorem.space/image?w=640&h=480&r=3441"],
    },
    {
      title: "Intelligent Granite Mouse",
      price: 451,
      images: ["https://api.lorem.space/image/watch?w=640&h=480&r=6515"],
    },
  ];

  function displayAllProductCards() {
    return data.map((product) => {
      const { title, images, price } = product;
      return (
        <ProductCard key={title} title={title} price={price} images={images} />
      );
    });
  }

  return (
    // main Products Container
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "top",
        alignItems: "center",
        backgroundColor: customColors.light_greyish,
        // border: "2px solid blue",
        pb: 2,
      }}
    >
      {/* Products Title */}
      <Typography variant="h5" my={3} color={customColors.text_secondary}>
        Products
      </Typography>

      {/* Container for all product cards */}
      <Grid container rowSpacing={0} columnSpacing={0}>
        {/* display all product cars */}
        {displayAllProductCards()}
      </Grid>
    </Container>
  );
};
