import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userId: null,
  username: null,
  email: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload._id;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logoutReducer: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.username = null;
      state.email = null;
    },
  },
});
export const { loginReducer, logoutReducer } = authSlice.actions;
export default authSlice.reducer;
