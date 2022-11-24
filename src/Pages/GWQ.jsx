import React from 'react'
import Navbar from '../Navbar/Navbar'
import img1 from '../Images/1.jpg'
import img2 from '../Images/2.jpg'
import img3 from '../Images/3.jpg'
import img4 from '../Images/4.jpg'
import img5 from '../Images/5.jpg'
import img6 from '../Images/6.jpg'
import img7 from '../Images/7.jpg'
import img8 from '../Images/8.jpg'
import img9 from '../Images/9.jpg'
import img10 from '../Images/10.jpg'

const GWQ = () => {
  return (
    <div>
        <Navbar background='bg-[#049B8C]' />
        <h1 className="mt-6 text-3xl font-semibold text-center">Ground Water Quality Index</h1>
        <div className="w-full p-12">
            <div className="grid grid-cols-2 gap-12">
                <img className='w-full' src={img1} alt="" />
                <img className='w-full' src={img2} alt="" />
                <img className='w-full' src={img3} alt="" />
                <img className='w-full' src={img4} alt="" />
                <img className='w-full' src={img5} alt="" />
                <img className='w-full' src={img6} alt="" />
                <img className='w-full' src={img7} alt="" />
                <img className='w-full' src={img8} alt="" />
                <img className='w-full' src={img9} alt="" />
                <img className='w-full' src={img10} alt="" />
            </div>
        </div>
    </div>
  )
}

export default GWQ