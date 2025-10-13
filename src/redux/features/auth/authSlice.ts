import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TUser = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "donor" | "admin";
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      localStorage.setItem("token", action.payload.token);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload)
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, setToken,logout } = authSlice.actions;

export default authSlice.reducer;
