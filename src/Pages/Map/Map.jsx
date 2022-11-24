import { useEffect, useMemo, useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
  Polygon,
  Circle,
} from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import classes from "./Map.module.css";
import Navbar from "../../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchGeoJson } from "../../store/actions/geoActions";
const libraries = ["places"];
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
const circleOptions = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};
const circleCenter = {
  lat: -3.745,
  lng: -38.523,
};
const onUnmount = (circle) => {
  console.log("Circle onUnmount circle: ", circle);
};
const paths = [
  { lat: 25.774, lng: -80.19 },
  { lat: 18.466, lng: -66.118 },
  { lat: 32.321, lng: -64.757 },
  { lat: 25.774, lng: -80.19 },
];
const onPolyLoad = (polygon) => {
  console.log("polygon: ", polygon);
};
const polygonOptions = {
  strokeColor: "#fc1e0d",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
  icons: [{ icon: "hello", offset: 0, repeat: "10px" }],
};

function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
const MapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBAoWCRMl3HHiRUmetjQgyl6wFZZizNioY",
    libraries,
  });
  const geoData = useSelector((state) => state.geo.geojson);
  const dispatch = useDispatch();
  const [userlat, setUserLat] = useState(41.28);
  const [userlon, setUserLon] = useState(0.1956);
  const [testState, setTestState] = useState("zac");
  const [autocomplete, setAutocomplete] = useState(null);
  console.log("the geodata:", geoData);
  function success(pos) {
    var crd = pos.coords;
    setUserLat(crd.latitude);
    setUserLon(crd.longitude);
  }
  useEffect(() => {
    setTestState("new name");
    console.log("component rendered");
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            // console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            // console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }, []);
  if (!isLoaded)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress variant="soft" />
      </div>
    );

  const center = { lat: 24.886, lng: -70.268 };

  const onLoad = (autocomplete) => {
    // console.log("autocomplete: ", autocomplete);

    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const placeData = autocomplete.getPlace();
      console.log("reached here", placeData);
      setUserLat(placeData.geometry.location.lat());
      setUserLon(placeData.geometry.location.lng());
      dispatch(fetchGeoJson(placeData.name));
      // setAutocomplete(null);
      // console.log(autocomplete.getPlace());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <>
      <Navbar background={classes.background} />
      <div className={classes.map_container}>
        <GoogleMap
          zoom={10}
          center={{ lat: userlat, lng: userlon }}
          mapContainerClassName={classes.map}
        >
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px",
              }}
            />
          </Autocomplete>
          <Polygon
            onLoad={onPolyLoad}
            paths={geoData}
            options={polygonOptions}
          />
          <Marker
            position={{ lat: userlat, lng: userlon }}
            zIndex={1}
            visible={true}
            onLoad={() => {}}
          />
        </GoogleMap>
        {/* <GoogleMap
          id="marker-example"
          mapContainerClassName={classes.map}
          zoom={5}
          center={circleCenter}
        >
          <Polygon onLoad={onPolyLoad} paths={paths} options={polygonOptions} />
          <Circle
            // optional
            // onLoad={onLoad}
            // optional
            onUnmount={onUnmount}
            // required
            center={circleCenter}
            // required
            options={circleOptions}
            radius={30000}
          />
        </GoogleMap> */}
        <div className={classes.map_content}>
          <h4>contents</h4>
          <div className={classes.checkboxes}>
            <input type="checkbox" name="ward boundary" />
            <label for="ward boundary">Ward Boundary</label>
          </div>
          <div className={classes.checkboxes}>
            <input type="checkbox" name="city boundary" />
            <label for="city boundary">City Boundary</label>
          </div>
          <div className={classes.checkboxes}>
            <input type="checkbox" name="land use" />
            <label for="land use">Land Use</label>
          </div>
          <div className={classes.checkboxes}>
            <input type="checkbox" name=" settlements" />
            <label for="settlements ">Settlements</label>
          </div>
          <div className={classes.checkboxes}>
            <input type="checkbox" name="population" />
            <label for="population">Population</label>
          </div>
          <div className={classes.checkboxes}>
            <input type="checkbox" name="sanitation inversion" />
            <label for="sanitation inversion">Sanitation Inversion</label>
          </div>
          <button className={classes.button}>Key info</button>
        </div>
      </div>

      {/* <h4 className={classes.h4}>Key</h4>
      <div className={classes.keys}>
        <div>
          <h5>Boundary</h5>
          <div className={classes.entry}>
            <div className={classes.color} />
            <p> City</p>
          </div>
          <div className={classes.entry}>
            <div className={classes.color} id={classes.ward} />
            <p> Ward</p>
          </div>
        </div>

        <div>
          <h5>Land Use</h5>
          <div className={classes.entry}>
            <div className={classes.color} id={classes.industrial} />
            <p> Industrial</p>
          </div>
          <div className={classes.entry}>
            <div className={classes.color} id={classes.agricultural} />
            <p> Agriculture</p>
          </div>
          <div className={classes.entry}>
            <div className={classes.color} id={classes.waterbodies} />
            <p> Water Bodies</p>
          </div>
        </div>
        <div>
          <h5>Sanitation Inversion</h5>
          <div className={classes.entry}>
            <div className={classes.color} id={classes.sewarage} />
            <p> Sewageries</p>
          </div>
          <div className={classes.entry}>
            <div className={classes.color} id={classes.FMS} />
            <p> FMS</p>
          </div>
          <div className={classes.entry}>
            <div className={classes.color} ID={classes.dewats} />
            <p>DEWATS</p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default MapPage;
