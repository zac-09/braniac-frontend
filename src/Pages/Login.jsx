import React, { useState } from 'react'
import axios from 'axios'
import qs from 'qs';
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import logo from '../Images/logo.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const login = () => {
    var data = qs.stringify({
      'email': email,
      'password': password 
    });
    var config = {
      method: 'post',
      url: 'http://localhost:4000/login',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  return (
    <div className='w-screen h-screen flex justify-center bg-gray-50'>
      <div className="w-1/3 h-full rounded-xl flex flex-col justify-around items-center">
        <div className="rounded-full shadow-lg bg-gray-200 p-4">
          <img className='w-[100px]' src={logo} alt="" />
        </div>
        <div className="w-full rounded flex flex-col items-start px-6 py-8 bg-white shadow gap-6">
          <h1 className="text-3xl font-bold">Login</h1>
          <div className="w-full">
            <h1 className="text-xl mb-2">Email Address</h1>
            <input value={email} onChange={e => setEmail(e.target.value)} className='w-full py-2 px-4 outline-none border-2 rounded' type="text" />
          </div>
          <div className="w-full relative">
            <h1 className="text-xl mb-2">Password</h1>
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className='w-full py-2 px-4 pr-12 outline-none border-2 rounded' />
            {showPassword ? <AiOutlineEyeInvisible onClick={() => setShowPassword(!showPassword)} className='cursor-pointer absolute text-2xl right-3 bottom-2' /> : <AiOutlineEye onClick={() => setShowPassword(!showPassword)} className='cursor-pointer absolute text-2xl right-3 bottom-2' />}
          </div>
          <div className="flex items-center gap-4">
            <input type="checkbox" name="" id="" />
            <h1>Remember me</h1>
          </div>
          <button onClick={() => login()} className='w-full bg-[#049B8C] text-white py-3 rounded'>Login</button>
        </div>
        <h1 className='text-gray-500'>Copyright © 2022 -- Braniac</h1>
      </div>
    </div>
  )
}

export default Login