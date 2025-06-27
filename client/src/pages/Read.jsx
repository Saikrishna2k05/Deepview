import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'
import BlogMetaData from '../components/BlogMetaData';
import BlogReadSkeleton from '../components/BlogReadSkeleton.jsx'

const Read = () => {
  const { id }=useParams();
  const [loading, setLoading]=useState(false);
  const [blog, setBlog]=useState('');
  useEffect(()=>{
    setLoading(true);
    const getBlog=async()=>{
      const res=await axios.get(`http://localhost:3000/blog/${id}`,{withCredentials:true});
      setBlog(res.data.blog);
      setLoading(false);
    }
    getBlog();
  },[])
  if (loading || !blog) return <BlogReadSkeleton />;
  return (
    <div className='max-w-6xl mx-auto p-10'>
      <div className='text-white font-extrabold text-3xl'>{blog.title}</div>
      <div className='text-white font-serif text-xl mt-4'>{blog.subtitle}</div>
      <div className="mt-4">
        <BlogMetaData author={blog.author} date={blog.createdAt} description={blog.description}/>
      </div>
      <img src={`${blog.thumbnail}`} alt="Blog thumbnail" className='w-full mt-6 rounded-lg' />
      <div className="text-white text-xl mt-6 leading-relaxed" 
      dangerouslySetInnerHTML={{ __html: blog.description }}>
      </div>
    </div>
  )
}

export default Read