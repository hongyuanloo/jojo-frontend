import {
  Typography,
  Container,
  Grid,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { CardStyled, TypographyStyled } from "../../styles/categoriesContainer";
import { customColors } from "../../themes/customColors";

export const CategoriesContainer = () => {
  const data = [
    {
      name: "Clothes",
      img: "https://api.lorem.space/image/fashion?w=640&h=480&r=3430",
    },
    {
      name: "Electronics",
      img: "https://api.lorem.space/image/watch?w=640&h=480&r=7796",
    },
    {
      name: "Furniture",
      img: "https://api.lorem.space/image/furniture?w=640&h=480&r=423",
    },
    {
      name: "Shoes",
      img: "https://api.lorem.space/image/shoes?w=640&h=480&r=5953",
    },
    {
      name: "Others",
      img: "https://api.lorem.space/image?w=640&h=480&r=5637",
    },
  ];

  // TODO OnClick : redirect to products filtered with that category

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

      {/* Container for all category cards */}
      <Grid container rowSpacing={0} columnSpacing={0}>
        {/* Container for one category card */}
        <Grid
          item
          mobile={6}
          tablet={4}
          // sx={{ border: "2px solid red" }}
          padding={1}
        >
          <CardStyled>
            {/* handle click on card */}
            <CardActionArea onClick={() => {}}>
              {/* card image */}
              <CardMedia
                component="img"
                image={data[0].img}
                alt="green iguana"
                sx={{ height: { tablet: "180px", mobile: "140px" } }}
              />
              {/* card title */}
              <CardContent sx={{ p: 1 }}>
                <TypographyStyled>{data[0].name}</TypographyStyled>
              </CardContent>
            </CardActionArea>
          </CardStyled>
        </Grid>
        <Grid item mobile={6} tablet={4} padding={1}>
          <CardStyled>
            <CardActionArea>
              <CardMedia
                component="img"
                height="180"
                image={data[1].img}
                alt="green iguana"
                sx={{ height: { tablet: "180px", mobile: "140px" } }}
              />
              <CardContent sx={{ p: 1 }}>
                <TypographyStyled>{data[1].name}</TypographyStyled>
              </CardContent>
            </CardActionArea>
          </CardStyled>
        </Grid>
        <Grid item mobile={6} tablet={4} padding={1}>
          <CardStyled>
            <CardActionArea>
              <CardMedia
                component="img"
                height="180"
                image={data[2].img}
                alt="green iguana"
                sx={{ height: { tablet: "180px", mobile: "140px" } }}
              />
              <CardContent sx={{ p: 1 }}>
                <TypographyStyled>{data[2].name}</TypographyStyled>
              </CardContent>
            </CardActionArea>
          </CardStyled>
        </Grid>
        <Grid item mobile={6} tablet={4} padding={1}>
          <CardStyled>
            <CardActionArea>
              <CardMedia
                component="img"
                height="180"
                image={data[3].img}
                alt="green iguana"
                sx={{ height: { tablet: "180px", mobile: "140px" } }}
              />
              <CardContent sx={{ p: 1 }}>
                <TypographyStyled>{data[3].name}</TypographyStyled>
              </CardContent>
            </CardActionArea>
          </CardStyled>
        </Grid>
        <Grid item mobile={6} tablet={4} padding={1}>
          <CardStyled>
            <CardActionArea>
              <CardMedia
                component="img"
                height="180"
                image={data[4].img}
                alt="green iguana"
                sx={{ height: { tablet: "180px", mobile: "140px" } }}
              />
              <CardContent sx={{ p: 1 }}>
                <TypographyStyled>{data[4].name}</TypographyStyled>
              </CardContent>
            </CardActionArea>
          </CardStyled>
        </Grid>
      </Grid>
    </Container>
  );
};
