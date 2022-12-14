import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import CircularProgress from "@mui/joy/CircularProgress";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Polygon,
  Circle,
} from "@react-google-maps/api";
import turf from "@turf/boolean-point-in-polygon";
import { Autocomplete } from "@react-google-maps/api";
import classes from "./Map.module.css";
import Navbar from "../../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllReports, fetchGeoJson } from "../../store/actions/geoActions";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
const libraries = ["places"];
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
const position = { lat: 33.772, lng: -117.214 };
const infoCenter = {
  lat: 38.685,
  lng: -115.234,
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
  let infoData = useSelector((state) => state.geo.infoPoints);
  const isLoading = useSelector((state) => state.geo.isLoading);
  const dispatch = useDispatch();
  const [userlat, setUserLat] = useState(41.28);
  const [userlon, setUserLon] = useState(0.1956);
  const [testState, setTestState] = useState("zac");
  const [autocomplete, setAutocomplete] = useState(null);

  const [sewage, setSewage] = useState(false);
  const [drinkingWater, setDrinkingWater] = useState(false);
  const [groundWater, setGroundWater] = useState(false);
  const [waterContamination, setwWterContamination] = useState(false);
  const [drainageSystem, setDrainageSystem] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);\

  infoData = infoData.filter((el) => {
    if (!drinkingWater && el.type == "Drinking water".toLocaleLowerCase()) {
      return false;
    } else if (!sewage && el.type == "Sewage".toLocaleLowerCase()) {
      return false;
    } else if (!groundWater && el.type == "round Water".toLocaleLowerCase()) {
      return false;
    } else if (!waterContamination && el.type == "Water Contamination".toLocaleLowerCase()) {
      return false;
    } else if (!drainageSystem && el.type == "Drainage System".toLocaleLowerCase()) {
      return false;
    } else {
     return  true;
    }
  });
  console.log("state drinking water", drinkingWater);
  console.log("state  sewage", sewage);
  console.log("state groundWater", groundWater);
  console.log("state waterContamination ", waterContamination);
  console.log("state drainageSystem ", drainageSystem);

  const [polygon, setPolygon] = useState([]);

  useEffect(() => {
    console.log(geoData);
    let list = [];
    if (geoData.type === "Polygon") {
      geoData.coordinates[0].forEach((item) => {
        list.push({ lat: item[1].toFixed(3), lng: item[0].toFixed(3) });
      });
    }
    console.log(list);
    setPolygon(list);
  }, [geoData]);

  // Get bounds from geojson
  const bounds = useMemo(() => {
    if (geoData.type !== "Point" && geoData.coordinates) {
      console.log(geoData.coordinates);
      let bounds = [];
      if (geoData.coordinates[0]) {
        bounds = new window.google.maps.LatLngBounds();
        geoData.coordinates.forEach((feature) => {
          console.log(feature);
          feature.forEach((coord) => {
            bounds.extend(new window.google.maps.LatLng(coord[1], coord[0]));
          });
        });
      } else {
        bounds.forEach((coord) => {
          bounds.extend(new window.google.maps.LatLng(coord[1], coord[0]));
        });
      }
      console.log(bounds);
      return bounds;
    }
  }, [geoData.coordinates]);

  // const getRandomCoords = () => {
  //   if(geoData.coordinates[0]){
  //     var x_max = bounds.getEast();
  //     var x_min = bounds.getWest();
  //     var y_max = bounds.getSouth();
  //     var y_min = bounds.getNorth();
  //     var x = Math.random() * (x_max - x_min) + x_min;
  //     var y = Math.random() * (y_max - y_min) + y_min;
  //     var point  = turf.point([x, y]);
  //     var poly   = geoData.coordinates
  //     var inside = turf.inside(point, poly);

  //     if (inside) {
  //         return point
  //     } else {
  //         return getRandomCoords()
  //     }
  //   }
  // }

  // useEffect(() => {
  //   const point = getRandomCoords()

  // }, [bounds])
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
      setAutocomplete(null);
      dispatch(fetchGeoJson(placeData.name));
      console.log(autocomplete.getPlace());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };
  const fetchDataHandler = async () => {
    try {
      // setIsLoading(true);
      dispatch(fetchAllReports(userlat, userlon));
      // setIsLoading(false);
    } catch (e) {
      // setIsLoading(false);
    }
  };
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

  // const center = { lat: userlat, lng: userlon };

  // const onLoad = (autocomplete) => {
  //   // console.log("autocomplete: ", autocomplete);

  //   setAutocomplete(autocomplete);
  // };

  return (
    <>
      <Navbar background={classes.background} />
      <div className={classes.map_container}>
        {infoData.length > 1 ? (
          <GoogleMap
            zoom={10}
            center={{ lat: userlat, lng: userlon }}
            mapContainerClassName={classes.map}
            id="our map"
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
            {/* <Polygon
        <GoogleMap
          zoom={10}
          center={{ lat: userlat, lng: userlon }}
          mapContainerClassName={classes.map}
        >
          <Autocomplete onLoad={(autocomplete) => setAutocomplete(autocomplete)} onPlaceChanged={() => onPlaceChanged()}>
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
          /> */}
            {infoData.map((info) => (
              <InfoWindow
                onLoad={(onLoad) => {}}
                position={{ lat: info.latitude, lng: info.longitude }}
              >
                {/* <div
                style={{
                  background: `white`,
                  border: `1px solid #ccc`,
                  padding: 15,
                }}
              >
                <h3>Name</h3>: <p>{info.name}</p>
                <h3>Type</h3>: <p>{info.type}</p>
                <h3>Description</h3>: <p>{info.description}</p>
                <h3>updatedAt</h3>: <p>{moment(info.updatedAt).format('MMMM Do YYYY, h:mm:ss a') }</p>
              </div> */}
                <Card
                  row
                  variant="outlined"
                  sx={{ width: 260, bgcolor: "background.body" }}
                >
                  <CardOverflow>
                    <AspectRatio ratio="1" sx={{ width: 90 }}>
                      <img
                        src={`https://uia-backend.onrender.com/${info.imageURL}`}
                        loading="lazy"
                        alt=""
                      />
                    </AspectRatio>
                  </CardOverflow>
                  <CardContent sx={{ px: 2 }}>
                    <Typography
                      fontWeight="md"
                      textColor="success.plainColor"
                      mb={0.5}
                    >
                      {info.name}
                    </Typography>
                    <Typography level="body2">{info.description}</Typography>
                  </CardContent>
                  <Divider />
                  <CardOverflow
                    variant="soft"
                    color="primary"
                    sx={{
                      px: 0.2,
                      writingMode: "vertical-rl",
                      textAlign: "center",
                      fontSize: "xs2",
                      fontWeight: "xl2",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    {info.type}
                  </CardOverflow>
                </Card>
              </InfoWindow>
            ))}

            {/* <Marker
            position={{ lat: userlat, lng: userlon }}
            zIndex={1}
            visible={true}
            onLoad={() => {}}
          /> */}
          </GoogleMap>
        ) : (
          <GoogleMap
            zoom={10}
            center={{ lat: userlat, lng: userlon }}
            mapContainerClassName={classes.map}
            id="our map"
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
            {/* <Polygon
            onLoad={onPolyLoad}
            paths={geoData}
            options={polygonOptions}
          /> */}

            {/* <Marker
            position={{ lat: userlat, lng: userlon }}
            zIndex={1}
            visible={true}
            onLoad={() => {}}
          /> */}
          </GoogleMap>
        )}
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
            <input
              type="checkbox"
              name="Sewage"
              onChange={() => {
                setSewage((prevState) => !prevState);
              }}
            />
            <label for="Sewage"> Sewage</label>
          </div>
          <div className={classes.checkboxes}>
            <input
              type="checkbox"
              name="Drinking water"
              onChange={() => {
                setDrinkingWater((prevState) => !prevState);
              }}
            />
            <label for="Drinking water">Drinking water</label>
          </div>
          <div className={classes.checkboxes}>
            <input
              type="checkbox"
              name="Ground Water"
              onChange={() => {
                setGroundWater((prevState) => !prevState);
              }}
            />
            <label for="lGround Water">Ground Water</label>
          </div>
          <div className={classes.checkboxes}>
            <input
              type="checkbox"
              name="Water Contamination"
              onChange={() => {
                setwWterContamination((prevState) => !prevState);
              }}
            />
            <label for="Water Contamination ">Water Contamination</label>
          </div>
          <div className={classes.checkboxes}>
            <input
              type="checkbox"
              name="Drainage System"
              onChange={() => {
                setDrainageSystem((prevState) => !prevState);
              }}
            />
            <label for="Drainage System">Drainage System</label>
          </div>

          {isLoading ? (
            <div style={{ marginLeft: "35px" }}>
              {" "}
              <LoadingSpinner />{" "}
            </div>
          ) : (
            <button className={classes.button} onClick={fetchDataHandler}>
              load Data
            </button>
          )}
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
