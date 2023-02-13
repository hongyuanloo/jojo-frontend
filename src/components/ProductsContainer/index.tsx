import { Container, Typography, Grid } from "@mui/material";
import { customColors } from "../../themes/customColors";
import { ProductCard } from "./ProductCard";
import { useEffect } from "react";
import { axiosPublic } from "../../requestMethods/axiosPublic";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { updateProducts } from "../../redux/features/productsSlice";

export const ProductsContainer = () => {
  //! For development use only.
  // const data1 = [
  //   {
  //     title: "Handmade Fresh Table",
  //     price: 44,
  //     images: ["https://placeimg.com/640/480/any?r=0.9178516507833767"],
  //   },
  //   {
  //     title: "Awesome Rubber Shirt",
  //     price: 88,
  //     images: ["https://api.lorem.space/image/watch?w=640&h=480&r=8850"],
  //   },
  //   {
  //     title: "Computadora",
  //     price: 109,
  //     images: ["https://api.lorem.space/image?w=640&h=480&r=6098"],
  //   },
  //   {
  //     title: "Gorgeous Rubber Hat",
  //     price: 22,
  //     images: ["https://api.lorem.space/image?w=640&h=480&r=3441"],
  //   },
  //   {
  //     title: "Intelligent Granite Mouse",
  //     price: 451,
  //     images: ["https://api.lorem.space/image/watch?w=640&h=480&r=6515"],
  //   },
  // ];
  // to dispatch action object to redux store
  const dispatch = useReduxDispatch();
  // allProducts state from redux store
  const allProducts = useReduxSelector((state) => state.products.allProducts);

  // display all products Cards
  function displayAllProductCards() {
    // map information from allProducts state to "ProductCard"
    const allProductsCards = allProducts.map((product) => {
      const { title, images, price } = product;
      return (
        <ProductCard key={title} title={title} price={price} images={images} />
      );
    });

    return (
      // Container for all product cards
      <Grid container rowSpacing={0} columnSpacing={0}>
        {/* display all product cards */}
        {allProductsCards}
      </Grid>
    );
  }

  useEffect(() => {
    // fetch products and update to allProducts state
    async function fetchProducts() {
      try {
        // get data from response if fetch is successful
        const { data } = await axiosPublic.get("/products");
        // update data to allProducts state
        dispatch(updateProducts({ allProducts: data }));

        // console.log("--response.data--", data);
      } catch (error) {
        console.log("--fetch /products error --", error);
      }
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      {/* display all Products if allProducts state is not empty */}
      {allProducts.length > 0 ? displayAllProductCards() : "Loading..."}
    </Container>
  );
};
