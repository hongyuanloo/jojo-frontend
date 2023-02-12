import { Typography } from "@mui/material";
import { customColors } from "../../themes/customColors";

export const CartHeader = () => {
  return (
    //cart header
    <Typography
      variant="h5"
      my={3}
      color={customColors.text_secondary}
      textAlign="center"
    >
      My Cart
    </Typography>
  );
};
