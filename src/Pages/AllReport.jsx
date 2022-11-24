import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'

const AllReport = () => {
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
        <>
            <Navbar background='bg-[#049B8C]' />
            <h1 className='text-center mt-6 text-3xl font-semibold'>All Reports</h1>
            <div className="p-8">
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='p-4 border border-black'>No.</th>
                            <th className="p-4 border border-black">Date</th>
                            <th className="p-4 border border-black">Time</th>
                            <th className="p-4 border border-black">Problem</th>
                            <th className="p-4 border border-black">Solution</th>
                            <th className="p-4 border border-black">Description</th>
                            <th className="p-4 border border-black">Address</th>
                            <th className="p-4 border border-black">Image</th>
                            <th className="p-4 border border-black">Status</th>
                            <th className="p-4 border border-black">Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={index}>
                                <td className="p-2 border border-black">{index+1}</td>
                                <td className="p-2 border border-black">{new Date(item.date).getDate()+'-'+new Date(item.date).getMonth()+'-'+new Date(item.date).getFullYear()}</td>
                                <td className="p-2 border border-black">{new Date(item.date).getHours()+':'+new Date(item.date).getMinutes()}</td>
                                <td className="p-2 border border-black">{item.type}</td>
                                <td className="p-2 border border-black">{(data.type === 'Sewage') ?
            'Sewerage': (data.type === 'Drinking Water') ? 
            'DEWAT': (data.type === 'Ground Water') ?'DEWAT/Sewerage':(data.type === 'Water Contamination') ? 'FSM/DEWAT/Sewerage':(data.type === 'Drainage System')? 'Sewerage/FSM': null}</td>
                                <td className="p-2 border border-black">{item.description}</td>
                                <td className="p-2 border border-black">{item.address}</td>
                                <td className="p-2 border border-black"><img className='w-[10vw]' src={'https://uia-backend.onrender.com/'+item.imageURL} alt="" /></td>
                                <td className="p-2 border border-black">{item.status}</td>
                                <td className="p-2 border border-black"><Link to={'/map/'+index}>Link</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}   

export default AllReport