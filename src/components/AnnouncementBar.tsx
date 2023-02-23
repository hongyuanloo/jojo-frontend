import { Box, Slide, Typography, IconButton } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { customColors } from "../themes/customColors";

export const AnnouncementBar = () => {
  const data = "Free Shipping on Orders Over $150";

  const [showText, setShowText] = useState(true);
  const [hideBar, setHideBar] = useState(true);

  const containerRef = useRef(null);

  useEffect(() => {
    // interval to show text every 2s.
    const intervalId = setInterval(() => {
      setShowText(true);

      // one off timer to hide text after shown for 1s.
      setTimeout(() => {
        setShowText(false);
      }, 1000);
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    // NavigationBar main container
    <Box
      display={hideBar ? "flex" : "none"}
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "28px",
        backgroundColor: customColors.light_greyish,
      }}
    >
      {/* dummy Box */}
      <Box />

      {/* Slide text from top-bottom-top */}
      <Box ref={containerRef}>
        <Slide
          direction="down"
          in={showText}
          timeout={{ enter: 900, exit: 900 }}
          container={containerRef.current}
        >
          <Typography variant="subtitle1" color={customColors.text_secondary}>
            {data}
          </Typography>
        </Slide>
      </Box>

      {/* button to hide annoucment bar */}
      <IconButton
        aria-label="hide announcement bar"
        sx={{ paddingRight: 1 }}
        onClick={() => setHideBar(false)}
      >
        <CloseOutlinedIcon sx={{ color: customColors.text_secondary }} />
      </IconButton>
    </Box>
  );
};
