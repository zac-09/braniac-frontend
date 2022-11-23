import { getGeoJson } from "../reducers/geoData";

export const fetchGeoJson = (location) => {
  return async (dispatch) => {
    const fmtLocation = location.replaceAll(" ", "+");
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${fmtLocation}&polygon_geojson=1&format=json`
    );
    if (!response.ok) {
      console.log("An error occured while fetching poylgon ");
    }
    const res = await response.json();
    dispatch(getGeoJson({ geojson: res[0].geojson }));
    console.log("res data from api:", res);
  };
};
