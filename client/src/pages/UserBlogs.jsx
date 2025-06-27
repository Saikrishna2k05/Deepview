import React, { useEffect, useState } from 'react'
import UserBlogsCard from '../components/UserBlogsCard.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const UserBlogs = () => {
  const navigate=useNavigate();
  const [userBlogs, setUserBlogs]=useState([]);
  useEffect(()=>{
      const getUserBlogs=async()=>
      {
        try
        {
          const response=await axios.get('http://localhost:3000/blog/userBlogs',{withCredentials:true})
          if(!response.data.success)
          {
            toast.error(response.data.message || "Something went wrong.");
            navigate('/Blogs');
          }
          setUserBlogs(response.data.userBlogs);
        }
        catch(err)
        {
          toast.error("Server error");
        }
    }
    getUserBlogs();
  },[])
  return (
    <>
      {userBlogs.length===0?
      (<div className="text-white text-center mt-10">You haven’t written any blogs yet.</div>)
      :(userBlogs.map((userBlog, i)=>{
        return <UserBlogsCard key={i} blog={userBlog} />
      }))}
    </>
  )
}

export default UserBlogs