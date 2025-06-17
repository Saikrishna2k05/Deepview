import React from 'react'
import logo from '../assets/deepview1.jpg'
import { NavLink } from 'react-router-dom'
import { CiSearch } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate=useNavigate();
  return (
    <div className="h-16 w-full flex items-center justify-between border-b-1 border-[#2a2a2a] bg-black px-8 sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <img src={logo} alt="DeepView Logo" className="w-35 cursor-pointer" onClick={()=>{navigate('/')}}/>
        <div className="flex items-center bg-white rounded-xl px-3 py-1">
          <input
            type="text"
            className="text-black outline-none bg-transparent placeholder:text-gray-600 w-40"
            placeholder="Search"
          />
          <CiSearch className="text-gray-700 w-5 h-5 cursor-pointer" />
        </div>
      </div>
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
          to="/blogs"
          className={({ isActive }) =>
            isActive ? "text-[#01b19d]  font-semibold" : "hover:text-gray-300"
          }
        >
          Blogs
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
          className={({ isActive }) =>
            'px-4 py-2 rounded-2xl transition-all duration-200 bg-white text-black hover:bg-gray-200'
          }
        >
          Login
        </NavLink>

        <NavLink to="/signup" className={({ isActive }) =>
            'px-4 py-2 rounded-2xl transition-all duration-200 bg-white text-black hover:bg-gray-200'
          }>
          Signup
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar
