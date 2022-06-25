import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: boolean;
  user: {
    token: string;
    username: string;
  } | null;
}
const savedAuth = localStorage.getItem("auth");
const initialState: UserState = {
  isLoggedIn: savedAuth ? true : false,
  user: savedAuth ? JSON.parse(savedAuth) : null,
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; username: string }>
    ) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    signout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, signout } = userSlice.actions;

export default userSlice.reducer;
