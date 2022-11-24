import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  geojson: [],
};

export const geoSlice = createSlice({
  initialState,
  name: "geoSlice",
  reducers: {
    getGeoJson(state, { payload }) {
      state.geojson = payload.geojson;
    },
  },
});

const { reducer, actions } = geoSlice;

export const {getGeoJson} =  actions
export default reducer;