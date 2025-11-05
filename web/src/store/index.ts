import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import productsReducer from "./productsSlice";
import checkoutReducer from "./checkoutSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer,
      products: productsReducer,
      checkout: checkoutReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
