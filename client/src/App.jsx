import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import Blogs from './pages/Blogs.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Write from './pages/Write.jsx'
import {Toaster} from 'react-hot-toast'
import Read from './pages/Read.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import UserBlogs from './pages/UserBlogs.jsx'
import EditBlog from './pages/EditBlog.jsx'

function App() {
  return (
    <>
    <ScrollToTop/>
    <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/Blogs' element={<Blogs/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Write' element={<Write/>}/>
        <Route path='/Blogs/:id' element={<Read/>}/>
        <Route path='/userBlogs' element={<UserBlogs/>}/>
        <Route path='/editBlog/:id' element={<EditBlog/>}/>
      </Route>
    </Routes>

    <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#111',
            color: '#fff',
             border: '1px solid #2a2a2a',
             borderRadius: '10px',
          },
        }}
      />
    </>
  )
}

export default App
