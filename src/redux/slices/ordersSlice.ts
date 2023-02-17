import { createSlice } from "@reduxjs/toolkit";
import { IOrderItem } from "../../types_interfaces";

interface IOrderItems {
  ordersItems: IOrderItem[];
}

// initial state
const initialState: IOrderItems = { ordersItems: [] };

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    updateOrderItems: (state, action) => {
      state.ordersItems = action.payload.ordersItems;
    },
  },
});

// action creators for each case of reduce function
export const { updateOrderItems } = ordersSlice.actions;

// for use in store.
export default ordersSlice.reducer;
