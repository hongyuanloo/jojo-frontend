import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types_interfaces";

interface IProducts {
  allProducts: IProduct[];
}

// initial state
const initialState: IProducts = { allProducts: [] };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      state.allProducts = action.payload.allProducts;
    },
  },
});

// action creators for each case of reduce function
export const { updateProducts } = productsSlice.actions;

// for use in store.
export default productsSlice.reducer;
