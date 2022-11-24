import { GoogleMap, Marker } from '@react-google-maps/api'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Navbar from '../Navbar/Navbar'
import classes from "./Map/Map.module.css";

const SingleMap = () => {
    const {index} = useParams()
    const [data, setData] = useState([])
    useEffect(() => {
        var config = {
            method: 'get',
            url: 'https://uia-backend.onrender.com/report',
        };
          
        axios(config)
            .then(function (response) {
                console.log(response.data);
                setData(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
          
    }, [])
    return (
        <div>
            <Navbar background='bg-[#049B8C]' />
            {data.length > 0 && 
                <GoogleMap
                    zoom={10}
                    center={{ lat: data[index].latitude, lng: data[index].longitude }}
                    mapContainerClassName={classes.map}
                >
                    <Marker
                        position={{ lat: data[index].latitude, lng: data[index].longitude }}
                        zIndex={1}
                        visible={true}
                        onLoad={() => {}}
                    />
                </GoogleMap>
            }
        </div>
    )
}

export default SingleMap