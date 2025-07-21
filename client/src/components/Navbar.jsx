import React, { useEffect, useState } from 'react'
import logo from '../assets/deepview1.jpg'
import { NavLink } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { FiEdit } from "react-icons/fi";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/authSlice'
import axios from 'axios'
import toast from 'react-hot-toast'
import ProfileDropdown from './ProfileDropdown.jsx'
import { fetchAllBlogs } from '../redux/blogSlice.js'
import { useLocation } from 'react-router-dom';
import { useDebounce } from './UseDebounce.jsx'
import {clearPhoto} from '../redux/userSlice.js'
import CategoryFilter from './CategoryFilter.jsx'



const Navbar = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [inputVal, setInputVal]=useState("");
  const location = useLocation();
  const debouncedValue=useDebounce(inputVal, 175);
  const role=useSelector((state)=>state.auth.user?.role);
    const isLoggedIn=useSelector((state)=>state.auth.isAuthenticated);

  const [search, setSearch]=useState(false);
  function logoHandler()
  {
    if(isLoggedIn)
    {
      navigate('/Blogs');
      return;
    }
    else{
      navigate('/');
      return;
    }
  }
  useEffect(()=>{    
    if(location.pathname=="/Blogs")
    {
      setSearch(true);
    }
    else{
      setSearch(false);
    }
  },[location.pathname])
  useEffect(() => {
    const params=new URLSearchParams();
    params.set("search", debouncedValue);
      if(location.pathname == '/Blogs') 
      {
      navigate(`/Blogs?${params.toString()}`);
      } 
  }, [debouncedValue]);

  async function logoutHandler()
  {
    try
    {
      const response=await axios.post('http://localhost:3000/user/logout',{},{withCredentials: true});
      if(!response.data.success)
      {
        toast.error(response.data.message);
      }
      toast.success(response.data.message)
      dispatch(logoutUser());
      dispatch(clearPhoto());
      navigate('/');
    }
    catch(err)
    {
      const message=err.response?.data?.message || err.message || "Something went wrong"
      toast.error(message);
    }
  }
  const loggedInNav=(
    <div className="flex items-center gap-6 text-white">
          <NavLink
          to="/Blogs"
          className={({ isActive }) =>
            isActive ? "text-[#01b19d] font-semibold" : "hover:text-gray-300"
          }
        >
          Blogs
        </NavLink>
        <NavLink
          to="/Write"
          className={({ isActive }) =>
            `flex  items-center gap-0.5 ${isActive ? "text-[#01b19d] font-semibold" : "hover:text-gray-300"}`
          }
        >
          <FiEdit/>
          <span>Write</span>
        </NavLink>        
         <ProfileDropdown/>

        <button
          className='px-4 py-2 rounded-2xl transition-all duration-200 bg-white text-black hover:bg-gray-200 cursor-pointer'
          onClick={logoutHandler}
        >
          Logout
        </button>

       
       </div>
  )

  const adminNav=(
    <div className="flex items-center gap-6 text-white">
          <NavLink
          to="/Blogs"
          className={({ isActive }) =>
            isActive ? "text-[#01b19d] font-semibold" : "hover:text-gray-300"
          }
        >
          Blogs
        </NavLink>
        <NavLink
          to="/Users"
          className={({ isActive }) =>
            `flex  items-center gap-0.5 ${isActive ? "text-[#01b19d] font-semibold" : "hover:text-gray-300"}`
          }
        >
          <span>Users</span>
        </NavLink>
        
        <button
          className='px-4 py-2 rounded-2xl transition-all duration-200 bg-white text-black hover:bg-gray-200 cursor-pointer'
          onClick={logoutHandler}
        >
          Logout
        </button>

       
       </div>
  )
  const guestNav=(
        <div className="flex items-center gap-6 text-white">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#01b19d] font-semibold" : "hover:text-gray-300"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-[#01b19d]  font-semibold" : "hover:text-gray-300"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/login"
          className='px-4 py-2 rounded-2xl transition-all duration-200 bg-white text-black hover:bg-gray-200'
        >
          Login
        </NavLink>

        <NavLink to="/signup" className='px-4 py-2 rounded-2xl transition-all duration-200 bg-white text-black hover:bg-gray-200'>
          Signup
        </NavLink>
      </div>
  )
  return (
    <div className="h-16 w-full flex items-center justify-between border-b-1 border-[#2a2a2a] bg-black px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <img src={logo} alt="DeepView Logo" className="w-35 cursor-pointer" onClick={logoHandler}/>
        {isLoggedIn && search && 
        <>  
        <div className="flex items-center bg-[#111] border border-[#2a2a2a] rounded-xl px-3 py-1">
          <input
            type="text"
            className="text-white outline-none bg-transparent placeholder:text-[#11111] w-40"
            placeholder="Search"
            onChange={(e)=>setInputVal(e.target.value)}
          />
          <CiSearch className="text-white w-5 h-5 cursor-pointer" />
        </div>
        <CategoryFilter/>
        </>
        }
      </div>

      {isLoggedIn? 
       role=='admin'?adminNav: loggedInNav
      :
        guestNav
      }
    </div>
  )
}

export default Navbar