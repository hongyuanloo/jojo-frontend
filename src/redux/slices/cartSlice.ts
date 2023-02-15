import { createSlice } from "@reduxjs/toolkit";
import { ICartItem } from "../../types_interfaces";

interface ICartItems {
  cartItems: ICartItem[];
}

// initial state
const initialState: ICartItems = { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartItems: (state, action) => {
      state.cartItems = action.payload.cartItems;
    },
  },
});

// action creators for each case of reduce function
export const { updateCartItems } = cartSlice.actions;

// for use in store.
export default cartSlice.reducer;
