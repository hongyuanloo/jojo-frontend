import { Box } from "@mui/material";
import {
  SubtotalBoxStyled,
  SubtotalPriceStyled,
  SubtotalTextStyled,
} from "../../styles/cartContainer";

interface ICartSubtotal {
  subtotal: number;
  discount?: number;
}

export const CartSubtotalSummary = ({
  subtotal,
  discount = 0,
}: ICartSubtotal) => {
  //TODO what props to pass in?
  return (
    //subtotal summary
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        py: 2,
        pr: 5,
        gap: "8px",
        //   border: "2px solid red",
      }}
    >
      {/* Subtotal */}
      <SubtotalBoxStyled>
        <SubtotalTextStyled>Subtotal:</SubtotalTextStyled>
        <SubtotalPriceStyled>{`SGD ${subtotal}`}</SubtotalPriceStyled>
      </SubtotalBoxStyled>

      {/* Discount */}
      <SubtotalBoxStyled>
        <SubtotalTextStyled>Discount:</SubtotalTextStyled>
        <SubtotalPriceStyled>{`SGD ${discount}`}</SubtotalPriceStyled>
      </SubtotalBoxStyled>

      {/* Grand total */}
      <SubtotalBoxStyled>
        <SubtotalTextStyled>Grand total:</SubtotalTextStyled>
        <SubtotalPriceStyled sx={{ fontSize: "1.1rem", fontWeight: 800 }}>
          {`SGD ${subtotal - discount}`}
        </SubtotalPriceStyled>
      </SubtotalBoxStyled>
    </Box>
  );
};
