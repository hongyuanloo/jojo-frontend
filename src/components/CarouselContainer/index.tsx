import { Box, Slide } from "@mui/material";
import { useEffect, useState } from "react";
import { ImgStyled } from "../../styles/carouselContainer";
import { customColors } from "../../themes/customColors";

const data = [
  "https://placeimg.com/640/480/any?r=0.9300320592588625",
  "https://placeimg.com/640/480/any?r=0.9178516507833767",
  "https://placeimg.com/640/480/any?r=0.8807778235430017",
  "https://cdn.lorem.space/images/shoes/.cache/640x480/paul-gaudriault-a-QH9MAAVNI-unsplash.jpg",
];

export const CarouselContainer = () => {
  // show or hide image from source
  const [showImg, setShowImg] = useState<boolean>(true);
  // loop through all images from source
  const [imgIndex, setImgIndex] = useState<number>(0);

  useEffect(() => {
    // create interval to show image every 4s.
    const intervalId = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % data.length);
      setShowImg(true);

      // one off timer to hide image after shown for 3s.
      setTimeout(() => {
        setShowImg(false);
      }, 3000);
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    // Carousel main container
    <Box
      sx={{
        border: "2px solid black",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        backgroundColor: customColors.dark_greyish,
      }}
    >
      {/* slide image from right to left. */}
      <Slide
        direction={showImg ? "left" : "right"}
        in={showImg}
        timeout={{ enter: 500, exit: 100 }}
      >
        <ImgStyled src={data[imgIndex]} alt="test"></ImgStyled>
      </Slide>
    </Box>
  );
};
