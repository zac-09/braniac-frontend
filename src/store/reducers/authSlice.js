import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
  isLoggedIn: false,
  isLoading: false,
  message: null,
};

export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    authenticationPending(state) {
      state.isLoading = true;
    },
    authenticationSuccess(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
    },
    authenticationFail(state, { payload }) {
      state.isLoading = false;
      state.message = payload;
    },
  },
});
const { reducer, actions } = authSlice;
export const {
    authenticationFail,
  authenticationPending,
  authenticationSuccess,
} = actions;
export default reducer;
