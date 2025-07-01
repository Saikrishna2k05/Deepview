import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.jsx';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();

  const isProfile = location.pathname === "/Profile"; 
  const showFooter = location.pathname === "/"; 

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
