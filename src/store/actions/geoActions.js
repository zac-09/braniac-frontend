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
    let coordinates = res[0].geojson.coordinates[0][0];
    const crdArr = [];
    coordinates.map((coordinate) =>
      crdArr.push({ lat: coordinate[1], lng: coordinate[0] })
    );
    console.log("res data from api:", res[0].geojson);
    console.log("res data after process:", crdArr);
    dispatch(getGeoJson({geojson:crdArr}));

  };
};
