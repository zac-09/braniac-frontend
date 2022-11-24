import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  geojson: [],
  infoPoints: [],
  isLoading: false,
};

export const geoSlice = createSlice({
  initialState,
  name: "geoSlice",
  reducers: {
    getGeoJson(state, { payload }) {
      state.geojson = payload.geojson;
    },
    setInfoPoint(state, { payload }) {
      state.infoPoints = payload.data;
      state.isLoading = false
      
    },
    setInfoPending(state, {payload}){
      state.isLoading = true
    },
    setInfoSuccess(state, {payload}){
      state.isLoading = false
    }
  },
});

const { reducer, actions } = geoSlice;

export const { getGeoJson, setInfoPoint, setInfoSuccess,setInfoPending } = actions;
export default reducer;
