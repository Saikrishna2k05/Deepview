import React, { useEffect, useState } from 'react'
import UserBlogsCard from '../components/UserBlogsCard.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import UserBlogsCardSkeleton from '../components/UserBlogsCardSkeleton.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBlogs } from '../redux/blogSlice.js';

const UserBlogs = () => {
  const navigate=useNavigate();
  const {loading, userBlogs}=useSelector((state)=>state.blog);
  const dispatch=useDispatch();
  useEffect(()=>{
      const getUserBlogs=async()=>
      {
        try
        {
          await dispatch(fetchUserBlogs()).unwrap();
        }
        catch(err)
        {
          const message=err?.message || "Something went wrong"
          toast.error(message);
        }
    }
    getUserBlogs();
  },[dispatch])
  return (
  <div className="max-w-6xl mx-auto px-4">
    {loading ? (
      Array.from({ length: 3 }).map((_, i) => <UserBlogsCardSkeleton key={i} />)
    ) : userBlogs.length === 0 ? (
      <div
        className="flex flex-col items-center justify-center text-white"
        style={{ height: 'calc(90vh - 4rem)' }}
      >
        <p className="text-lg sm:text-3xl font-medium mb-2">
          You haven't written any blogs yet.
        </p>
        <p className="text-sm sm:text-xl font-thin text-white">
          Start sharing your thoughts with the world!
        </p>
      </div>
    ) : (
      userBlogs.map((blog) => <UserBlogsCard key={blog._id} blog={blog} />)
    )}
  </div>
);

}

export default UserBlogs