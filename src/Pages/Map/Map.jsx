import { useMemo } from "react";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import classes from "./Map.module.css";
import Navbar from "../../Navbar/Navbar";

const MapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>loading....</div>;
  return <Map />;
};

function Map() {
  const center = useMemo(() => ({ lat: 23.8103, lng: 90.4125 }), []);

  return (
    <>
      <Navbar background={classes.background} />
      <div className={classes.map_container}>
        <GoogleMap
          zoom={10}
          center={{ lat: 44, lng: -80 }}
          mapContainerClassName={classes.map}
        >
          <Marker position={center} />
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
