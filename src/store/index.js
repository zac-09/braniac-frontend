import { configureStore } from "@reduxjs/toolkit";
import geoReducer from './reducers/geoData'
const store = configureStore({
    reducer: {
        geo:geoReducer
    },
  });
  
  export default store;