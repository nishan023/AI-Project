import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: null,
  userId: null,
  username: null,
  email: null,
  gmailLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.access_token;
      state.userId = action.payload._id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.gmailLogin = action.payload.gmailLogin;
    },
    logoutReducer: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
      state.username = null;
      state.email = null;
      state.gmailLogin = false;
    },
  },
});
export const { loginReducer, logoutReducer } = authSlice.actions;
export default authSlice.reducer;
