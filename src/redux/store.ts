import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";

// setup redux store
export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

// Infer reduxRootState and reduxDispatch types from store itself.
export type reduxRootState = ReturnType<typeof store.getState>;
export type reduxDispatch = typeof store.dispatch;
