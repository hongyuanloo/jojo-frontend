import { Box, Typography } from "@mui/material";

export const AnnouncementBar = () => {
  const data = "Free Shipping on Orders Over $150";

  return (
    <Box
      sx={{
        border: "2px solid black",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Typography variant="subtitle1">{data}</Typography>
    </Box>
  );
};
