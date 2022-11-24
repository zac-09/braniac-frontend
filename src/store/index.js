import { configureStore } from "@reduxjs/toolkit";
import geoReducer from "./reducers/geoData";
import authReducer from "./reducers/authSlice";
const store = configureStore({
  reducer: {
    geo: geoReducer,
    auth: authReducer,
  },
});

export default store;
