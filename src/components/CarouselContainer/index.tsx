import { useEffect, useState } from "react";
import { useReduxSelector } from "../../redux/hooks";
import { Slide } from "@mui/material";
import { ImgContainerStyled, ImgStyled } from "../../styles/carouselContainer";
import { CircularProgressLoading } from "../ProgressIndicator";

//! for development use
// const data = [
//   "https://placeimg.com/640/960/any?r=0.9300320592588625",
//   "https://placeimg.com/640/960/any?r=0.9178516507833767",
//   "https://placeimg.com/640/480/any?r=0.8807778235430017",
//   "https://cdn.lorem.space/images/shoes/.cache/640x480/paul-gaudriault-a-QH9MAAVNI-unsplash.jpg",
// ];

export const CarouselContainer = () => {
  // show or hide image from source
  const [showImg, setShowImg] = useState<boolean>(true);
  // loop through all images from source
  const [imgIndex, setImgIndex] = useState<number>(0);

  // store featured images
  const [featuredImages, setFeaturedImages] = useState<string[]>([]);

  // allProducts state from redux store
  const allProducts = useReduxSelector((state) => state.products.allProducts);

  // update featuredImages when allProducts is ready.
  useEffect(() => {
    // temporary imagesData container
    const imagesData: string[] = [];

    // store all featured Images into imagesData
    allProducts.forEach((product) => {
      const { images, isFeatured } = product;
      if (isFeatured) imagesData.push(images[0]);
    });

    // update imagesData to featuredImages state
    setFeaturedImages([...imagesData]);
  }, [allProducts]);

  useEffect(() => {
    // interval to show image every 4s.
    const intervalId = setInterval(() => {
      setShowImg(true);

      // one off timer to hide image after shown for 3s.
      setTimeout(() => {
        setImgIndex((prev) => (prev + 1) % featuredImages.length);
        setShowImg(false);
      }, 3000);
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [featuredImages]);

  return (
    // Carousel main container
    <ImgContainerStyled
      sx={{
        px: 2,
        // border: "2px solid black",
      }}
    >
      {/* if featuredImages is empty: show loader*/}
      {/* if featuredImages is not empty:slide image from right to left*/}
      {featuredImages.length > 0 ? (
        <Slide
          direction={showImg ? "left" : "right"}
          in={showImg}
          timeout={{ enter: 500, exit: 100 }}
        >
          <ImgStyled
            src={featuredImages[imgIndex]}
            alt="featured images"
          ></ImgStyled>
        </Slide>
      ) : (
        CircularProgressLoading()
      )}
    </ImgContainerStyled>
  );
};
