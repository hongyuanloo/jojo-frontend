import { OrdersHeader } from "./OrdersHeader";
import { IOrderItem, OrdersBody } from "./OrdersBody";
import { Box } from "@mui/material";
import { customColors } from "../../themes/customColors";
import { ContinueShopping } from "./ContinueShopping";

export const OrdersContainer = () => {
  //TODO fetch data.

  const data: IOrderItem[] = [
    {
      id: "111234dfr23qre2",
      totalItems: 2,
      paidAt: new Date(Date.now()),
      totalPaid: 1233.45,
      orderItems: [],
    },
    {
      id: "2222234dfr23qre2",
      paidAt: new Date(Date.now()),
      totalPaid: 455.45,
      totalItems: 9,
      orderItems: [],
    },
    {
      id: "3333234dfr23qre2",
      paidAt: new Date(Date.now()),
      totalPaid: 69.45,
      totalItems: 5,
      orderItems: [],
    },
  ];

  return (
    // main cart container
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "top",
        backgroundColor: customColors.light_greyish,
        color: customColors.text_secondary,
        // border: "2px solid red",
        pb: 2,
      }}
    >
      {/* orders header */}
      <OrdersHeader />

      {/* orders body */}
      {data.length > 0 ? (
        <OrdersBody ordersItems={data} />
      ) : (
        // button return to home page to continue shopping
        <ContinueShopping parameter="orders" />
      )}
    </Box>
  );
};
