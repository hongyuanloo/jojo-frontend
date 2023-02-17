import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import ordersReducer from "./slices/ordersSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";

// ref: https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/

// configure redux persist
const persistConfig = {
  key: "root",
  storage, // storage refers to local storage.
  stateReconciler: autoMergeLevel2, // indicate how persisted data is merged into redux store on refresh.
};

// combine all reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

// return type of rootReducer
type TrootReducer = ReturnType<typeof rootReducer>;

// "enchanced" reducer with persist capability
const persistedReducer = persistReducer<TrootReducer>(
  persistConfig,
  rootReducer
);

// setup redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

// Infer reduxRootState and reduxDispatch types from store itself.
export type reduxRootState = ReturnType<typeof store.getState>;
export type reduxDispatch = typeof store.dispatch;

// store persistor
export const persistor = persistStore(store);
