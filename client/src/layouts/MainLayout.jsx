import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.jsx';
import { Outlet, useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
import {setPhoto} from '../redux/userSlice.js'
import axios from 'axios'
import { useSelector } from 'react-redux'; 

const MainLayout = () => {
  const location = useLocation();

  const isProfile = location.pathname === "/Profile"; 
  const showFooter = location.pathname === "/"; 
  const dispatch = useDispatch();

 

const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

useEffect(() => {
  if (!isLoggedIn) return; 

  const loadUser = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/profile', {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setPhoto(res.data.details[0].photoUrl));
      }
    } catch (err) {
      console.error('Failed to load user profile', err?.response?.data || err.message);
    }
  };

  loadUser();
}, [dispatch, isLoggedIn]); 

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        className={`flex-grow bg-black min-h-[calc(100vh-8rem)] ${
          isProfile ? '' : 'px-6 py-4'
        }`}
      >
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
