import React, { useEffect, useState } from 'react'
import UserBlogsCard from '../components/UserBlogsCard.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import UserBlogsCardSkeleton from '../components/UserBlogsCardSkeleton.jsx';

const UserBlogs = () => {
  const navigate=useNavigate();
  const [userBlogs, setUserBlogs]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
      const getUserBlogs=async()=>
      {
        try
        {
          setLoading(true);
          const response=await axios.get('http://localhost:3000/blog/userBlogs',{withCredentials:true})
          if(!response.data.success)
          {
            toast.error(response.data.message || "Something went wrong.");
            navigate('/Blogs');
            return;
          }
          setUserBlogs(response.data.userBlogs);
        }
        catch(err)
        {
          toast.error("Server error");
        }
        finally{
          setLoading(false);
        }
    }
    getUserBlogs();
  },[])
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