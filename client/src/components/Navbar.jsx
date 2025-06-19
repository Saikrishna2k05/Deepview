import React from 'react'
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

const Navbar = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
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
      navigate('/');
    }
    catch(err)
    {
      const message=err.response?.data?.message || err.message || "Something went wrong"
      toast.error(message);
    }
  }
  const isLoggedIn=useSelector((state)=>state.auth.isAuthenticated);
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
      <div className="flex items-center gap-6">
        <img src={logo} alt="DeepView Logo" className="w-35 cursor-pointer" onClick={()=>{navigate('/')}}/>
        {isLoggedIn && 
        <div className="flex items-center bg-[#111] border border-[#2a2a2a] rounded-xl px-3 py-1">
          <input
            type="text"
            className="text-white outline-none bg-transparent placeholder:text-[#11111] w-40"
            placeholder="Search"
          />
          <CiSearch className="text-white w-5 h-5 cursor-pointer" />
        </div>
        }
      </div>


      {isLoggedIn? 
       loggedInNav
      :
        guestNav
      }
    </div>
  )
}

export default Navbar
