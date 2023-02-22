import { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Grid,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { useReduxSelector } from "../../redux/hooks";
import { CardStyled, TypographyStyled } from "../../styles/categoriesContainer";
import { customColors } from "../../themes/customColors";
import { TCategory } from "../../types_interfaces";
import { CircularProgressLoading } from "../ProgressIndicator";

export const CategoriesContainer = () => {
  // ! for development use only.
  // const data = [
  //   {
  //     name: "Clothes",
  //     img: "https://api.lorem.space/image/fashion?w=640&h=480&r=3430",
  //   },
  //   {
  //     name: "Electronics",
  //     img: "https://api.lorem.space/image/watch?w=640&h=480&r=7796",
  //   },
  //   {
  //     name: "Furniture",
  //     img: "https://api.lorem.space/image/furniture?w=640&h=480&r=423",
  //   },
  //   {
  //     name: "Shoes",
  //     img: "https://api.lorem.space/image/shoes?w=640&h=480&r=5953",
  //   },
  //   {
  //     name: "Others",
  //     img: "https://api.lorem.space/image?w=640&h=480&r=5637",
  //   },
  // ];

  // interface for categories datum
  interface IcategoriesDatum {
    name: TCategory | "";
    images: string[];
  }

  // store categoriesData
  const [categoriesData, setCategoriesData] = useState<IcategoriesDatum[]>([]);

  // allProducts state from redux store
  const allProducts = useReduxSelector((state) => state.products.allProducts);

  // update categoriesData whenever allProducts is updated
  useEffect(() => {
    // store visited categories
    const visitedCategories: TCategory[] = [];
    // store new categoriesData temporary
    const tempCategoriesData: IcategoriesDatum[] = [];

    // process new allProducts and update tempCategoriesData
    allProducts.forEach((product) => {
      const tempCategoryDatum: IcategoriesDatum = { name: "", images: [] };
      const { categories, images } = product;

      let index = visitedCategories.findIndex(
        (category) => category === categories[0]
      );

      // category already visited
      if (index !== -1) return;

      // category not visited yet;
      tempCategoryDatum.name = categories[0];
      tempCategoryDatum.images.push(images[0]);
      // update visited category
      visitedCategories.push(categories[0]);
      // update visited category
      tempCategoriesData.push({ ...tempCategoryDatum });
    });

    // update categoriesData with tempCategoriesData
    setCategoriesData([...tempCategoriesData]);
  }, [allProducts]);

  // display all category card as grid items
  function DisplayCategories() {
    const categoryGridItems = categoriesData.map((category) => {
      return (
        // Container for one category card
        <Grid
          item
          mobile={6}
          tablet={4}
          // sx={{ border: "2px solid red" }}
          padding={1}
          key={category.images[0]}
        >
          <CardStyled>
            {/* handle click on card */}
            <CardActionArea
              onClick={() => {
                console.log(`category: ${category.name}`);
              }}
            >
              {/* card image */}
              <CardMedia
                component="img"
                image={category.images[0]}
                alt={`image of ${category.name}`}
                sx={{ height: { tablet: "180px", mobile: "140px" } }}
              />
              {/* card title */}
              <CardContent sx={{ p: 1 }}>
                <TypographyStyled>{category.name}</TypographyStyled>
              </CardContent>
            </CardActionArea>
          </CardStyled>
        </Grid>
      );
    });
    return categoryGridItems;
  }

  return (
    // main Categories Container
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
      {/* Categories Title */}
      <Typography variant="h5" my={3} color={customColors.text_secondary}>
        Categories
      </Typography>

      {/* if categoriesData is empty, show progress loader */}
      {/* if categoriesData is not empty, show data */}
      {categoriesData.length === 0 ? (
        CircularProgressLoading()
      ) : (
        //  Container for all category cards
        <Grid container rowSpacing={0} columnSpacing={0}>
          {/* display all category cards */}
          {DisplayCategories()}
        </Grid>
      )}
    </Container>
  );
};
