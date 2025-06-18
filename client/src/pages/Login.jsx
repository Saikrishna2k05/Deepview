import React from 'react'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod'
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import {loginUser} from '../redux/authSlice.js'
import toast from 'react-hot-toast';



const Login = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
   const schema=z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
  })
  const {register,handleSubmit ,formState: {errors}}=useForm({ resolver: zodResolver(schema) });
  const submit=async({email, password})=>
    {
        try
        {
        const response=await axios.post('http://localhost:3000/user/login',{email, password}, { withCredentials: true });
        if(!response.data.success)
        {
          toast.error(response.data.message);
          return;
        }
        dispatch(loginUser(response.data.user));
        navigate('/Blogs');
        toast.success(response.data.message);
      }
      catch(err)
      {
        const message=err.response?.data?.message || err.message || "Something went wrong"
        toast.error(message);
      }
    }
  return (
    <>
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center bg-black">
        <form className="flex flex-col gap-4 w-96 px-6 py-8 justify-center items-center text-white bg-[#111] border border-[#2a2a2a] rounded-xl"
              onSubmit={handleSubmit(submit)}
        >
            <div className="flex flex-col items-center gap-0">
              <span className="font-bold text-2xl mb-">Welcome to DeepView</span>
              <span className="text-[#ababab]">Sign in to unlock stories that matter.</span>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="email">Email</label>
              <input
              {...register("email")}
              placeholder="name@email.com"
              className="bg-black border border-[#2a2a2a] rounded-xl w-80 px-4 py-2 outline-none"
              />
              {errors.email && <span className='text-red-500'> {errors.email.message}</span>}
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="password">Password</label>
              <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="bg-black border border-[#2a2a2a] rounded-xl w-80 px-4 py-2 outline-none placeholder:font-semibold placeholder:text-"
              />
              {errors.password && <span className='text-red-500'> {errors.password.message}</span>}
            </div>
            <button className="bg-white text-black px-4 py-2 w-80 rounded-md cursor-pointer hover:bg-[#ffffffcc]">
              Login
            </button>
            <span>Don't have an account? <Link to='/signup' className='underline'>Signup</Link></span>
        </form>
    </div>
    </>
  )
}

export default Login