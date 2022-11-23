import { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import classes from "./Map.module.css";
import Navbar from "../../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchGeoJson } from "../../store/actions/geoActions";

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
const polyOptions = {
  strokeColor: "#1B4D3E",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#1B4D3E",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,

  zIndex: 1,
};
function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
const MapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBAoWCRMl3HHiRUmetjQgyl6wFZZizNioY",
    libraries: ["places"],
  });
  const geoData = useSelector((state) => state.geo.geojson);
  const dispatch = useDispatch();
  const [userlat, setUserLat] = useState(41.28);
  const [userlon, setUserLon] = useState(0.1956);
  const [autocomplete, setAutocomplete] = useState(null);
  console.log("the geo data from state:", geoData);
  function success(pos) {
    var crd = pos.coords;
    setUserLat(crd.latitude);
    setUserLon(crd.longitude);
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  useEffect(() => {
    console.log("API KEY:", "AIzaSyBAoWCRMl3HHiRUmetjQgyl6wFZZizNioY");
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }, []);
  if (!isLoaded) return <div>loading....</div>;
  return (
    <Map
      userlat={userlat}
      userlon={userlon}
      autocomplete={autocomplete}
      dispatch={dispatch}
      setAutocomplete={setAutocomplete}
      setUserLat={setUserLat}
      setUserLon={setUserLon}
      geo={geoData}
    />
  );
};

function Map(props) {
  const center = useMemo(
    () => ({ lat: props.userlat, lng: props.userlon }),
    [props.userlat, props.userlon]
  );
  const onLoad = (autocomplete) => {
    console.log("autocomplete: ", autocomplete);

    props.setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (props.autocomplete !== null) {
      const placeData = props.autocomplete.getPlace();

      props.setUserLat(placeData.geometry.location.lat);
      props.setUserLon(placeData.geometry.location.lon);
      props.dispatch(fetchGeoJson(placeData.name));

      console.log(props.autocomplete.getPlace());
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
          center={{ lat: props.userlat, lng: props.userlon }}
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
          {props.geo.type && (
            <Polyline
              onLoad={() => {}}
              path={props.geo.coordinates}
              options={polyOptions}
            />
          )}
          <Marker
            position={{ lat: props.userlat, lng: props.userlon }}
            zIndex={1}
            visible={true}
          />
        </GoogleMap>
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

      <h4 className={classes.h4}>Key</h4>
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
      </div>
    </>
  );
}

export default MapPage;
