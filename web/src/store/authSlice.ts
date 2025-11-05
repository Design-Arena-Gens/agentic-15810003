import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserProfile } from "@/types";

interface AuthState {
  user: UserProfile | null;
  status: "idle" | "loading" | "error";
  error?: string;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startAuth(state) {
      state.status = "loading";
      state.error = undefined;
    },
    authSuccess(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
      state.status = "idle";
      state.error = undefined;
    },
    authFailure(state, action: PayloadAction<string>) {
      state.status = "error";
      state.error = action.payload;
    },
    signOut(state) {
      state.user = null;
      state.status = "idle";
      state.error = undefined;
    },
  },
});

export const { startAuth, authSuccess, authFailure, signOut } =
  authSlice.actions;

export default authSlice.reducer;
