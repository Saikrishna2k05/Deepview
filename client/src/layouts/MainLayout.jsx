import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet  } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import { useLocation } from 'react-router-dom'

const MainLayout = () => {
  const location = useLocation();
  const showFooterRoutes = ['/']; 
  const shouldShowRoutes = showFooterRoutes.includes(location.pathname);
  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar/>
        <main className='flex-grow px-6 py-4 bg-black min-h-[cal(100vh-8rem)]'>
            <Outlet/>
        </main>
        {shouldShowRoutes && <Footer />}
    </div>
  )
}

export default MainLayout