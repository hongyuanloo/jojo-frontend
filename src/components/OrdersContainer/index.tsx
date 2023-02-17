import { ContinueShopping } from "./ContinueShopping";
import { PleaseLogin } from "../CartContainer/PleaseLogin";
import { OrdersHeader } from "./OrdersHeader";
import { OrdersBody } from "./OrdersBody";
import { Box } from "@mui/material";
import { customColors } from "../../themes/customColors";
import { useLocalStorage } from "../customHooks/useLocalStorage";
import { useState, useEffect } from "react";
import { IUser } from "../../types_interfaces";
import { axiosJWT } from "../../requestMethods/axiosJWT";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { updateOrderItems } from "../../redux/slices/ordersSlice";

export const OrdersContainer = () => {
  //! For development use only.
  // const data: IOrderItem[] = [
  //   {
  //     id: "111234dfr23qre2",
  //     totalItems: "2",
  //     paidAt: new Date(Date.now()),
  //     totalPaid: "1233.45",
  //     orderItems: [],
  //   },
  //   {
  //     id: "2222234dfr23qre2",
  //     paidAt: new Date(Date.now()),
  //     totalPaid: "455.45",
  //     totalItems: "9",
  //     orderItems: [],
  //   },
  //   {
  //     id: "3333234dfr23qre2",
  //     paidAt: new Date(Date.now()),
  //     totalPaid: "69.45",
  //     totalItems: "5",
  //     orderItems: [],
  //   },
  // ];

  // init access to local storage
  const [LS_getUser] = useLocalStorage("user");

  // default user state
  const defaultUser: IUser = { id: "", role: "BASIC", username: "" };

  // init user state to data from local storage, or "defaultUser"
  const [user] = useState(LS_getUser() || defaultUser);

  const { id } = user;

  // to dispatch action object to redux store
  const dispatch = useReduxDispatch();
  // ordersItems state from redux store
  const ordersItems = useReduxSelector((state) => state.orders.ordersItems);

  useEffect(() => {
    // fetch orders
    async function fetchOrdersData() {
      try {
        const { data } = await axiosJWT.get(`users/${id}/orders`);
        // update data to ordersItems state
        dispatch(updateOrderItems({ ordersItems: [...data] }));

        // console.log("-fetchOrdersData--", data);
      } catch (error) {
        console.log("--fetch /orders error--", error);
      }
    }

    fetchOrdersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      {/* If user is not login, prompt user to login. */}
      {!id && <PleaseLogin parameter="orders" />}

      {/* orders body */}
      {ordersItems.length > 0 ? (
        <OrdersBody />
      ) : (
        // button return to home page to continue shopping
        <ContinueShopping parameter="orders" />
      )}
    </Box>
  );
};
