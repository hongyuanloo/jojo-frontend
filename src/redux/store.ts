import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";
import cartReducer from "./features/cartSlice";

// setup redux store
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

// Infer reduxRootState and reduxDispatch types from store itself.
export type reduxRootState = ReturnType<typeof store.getState>;
export type reduxDispatch = typeof store.dispatch;
