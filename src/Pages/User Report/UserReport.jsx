import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./UserReport.module.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";

const UserReport = () => {
  const navigate = useNavigate();
  const [drop, setDrop] = useState(false)
  const [data, setData] = useState({
    name: "",
    type: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    description: "",
    image: null,
    latitude: "18.076090",
    longitude: "70.877426",
  })
  const [loading, setLoading] = useState(false)
  const submitHandler = () => {
    setLoading(true)
    var formdata = new FormData();
    formdata.append('image', data.image);
    formdata.append('name', data.name);
    formdata.append('type', data.type);
    formdata.append('description', data.description);
    formdata.append('latitude', '18.076090');
    formdata.append('longitude', '70.877426');
    formdata.append('address', data.address+', '+data.city+', '+data.state+', '+data.zip);

    var config = {
      method: 'post',
      url: 'https://uia-backend.onrender.com/report',
      data : formdata
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoading(false)
        navigate('/')
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false)
      });
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setData({...data, latitude: position.coords.latitude, longitude: position.coords.longitude})
    });
  }, [])
  
  return (
    <>
      <Navbar background={classes.background} />
      <section id="userreport"> 
      <div className={classes.container}>
      <h3 className={classes.h3}>PROBLEM REPORT</h3>
        <div>
          <div className={classes.row}>
            <label>
              Name:
              <input value={data.name} onChange={e => setData(prev => ({ ...prev, name: e.target.value }))} type="text" name="name" className={classes.input}/>
            </label>
            
            <label className="flex items-center gap-2">
              Type:
              <div className="w-full">
                <button onClick={() => setDrop(prev => !prev)} className="text-white bg-[#049B8C] font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center min-w-[120px] justify-between" type="button" data-dropdown-toggle="dropdown">{data.type || 'Choose'}<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                <div className={`${!drop && 'hidden'} bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4 absolute`} id="dropdown">
                    <ul className="py-1" aria-labelledby="dropdown">
                      <li onClick={() => setData(prev => ({...prev, type: 'Sewage'}))} className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Sewage</li>
                      <li onClick={() => setData(prev => ({...prev, type: 'Drinking water'}))} className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Drinking water</li>
                      <li onClick={() => setData(prev => ({...prev, type: 'Ground Water'}))} className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Ground Water</li>
                      <li onClick={() => setData(prev => ({...prev, type: 'Water Contamination'}))} className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Water Contamination</li>
                      <li onClick={() => setData(prev => ({...prev, type: 'Drainage System'}))} className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Drainage System</li>
                    </ul>
                </div>
              </div>
            </label>
            </div>
            <div className={classes.row}>
            <label>
              Address:
              <input value={data.address} onChange={e => setData(prev => ({ ...prev, address: e.target.value }))} type="text" name="name" className={classes.input1} />
            </label>
            </div>
            <div className={classes.row}>
            <label>
              City:
              <input value={data.city} onChange={e => setData(prev => ({ ...prev, city: e.target.value }))} type="text" name="name" className={classes.input2} />
            </label>

            <label>
              State:
              <input value={data.state} onChange={e => setData(prev => ({ ...prev, state: e.target.value }))} type="text" name="name" className={classes.input2}/>
            </label>

            <label>
              Zip:
              <input value={data.zip} onChange={e => setData(prev => ({ ...prev, zip: e.target.value }))} type="text" name="name" className={classes.input2}/>
            </label>

            </div>
            
            <div className={classes.row}>
            <label>
              Issue description:
              <input value={data.description} onChange={e => setData(prev => ({ ...prev, description: e.target.value }))} type="text" name="name" className={classes.input3} />
            </label>

            </div>
            
            <div className={classes.row}>
            <label>
            Upload issue image
            <input onChange={e => setData(prev => ({ ...prev, image: e.target.files[0] }))} type="file" className={classes.file}/>
            </label>
            </div>
            {loading ? (
            // <CircularProgress variant="soft" color="black" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft:"180px"
                }}
              >
                <LoadingSpinner />
              </div>
            ) : (
              <button onClick={() => submitHandler()} className={classes.button}>Submit</button>
            )}
        </div>
        </div>
      </section>
      
      <Footer/>
    </>
  );
};

export default UserReport;      