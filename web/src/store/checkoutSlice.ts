import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CheckoutState, ShippingAddress } from "@/types";

const initialState: CheckoutState = {
  address: null,
  paymentMethod: null,
  note: undefined,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setAddress(state, action: PayloadAction<ShippingAddress>) {
      state.address = action.payload;
    },
    setPaymentMethod(
      state,
      action: PayloadAction<NonNullable<CheckoutState["paymentMethod"]>>,
    ) {
      state.paymentMethod = action.payload;
    },
    setOrderNote(state, action: PayloadAction<string | undefined>) {
      state.note = action.payload;
    },
    resetCheckout() {
      return initialState;
    },
  },
});

export const { setAddress, setPaymentMethod, setOrderNote, resetCheckout } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
