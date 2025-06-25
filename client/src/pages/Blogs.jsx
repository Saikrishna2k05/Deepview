import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import BlogCard from '../components/BlogCard.jsx'
import BlogSkeleton from '../components/BlogSkeleton.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '../redux/blogSlice.js';

const Blogs = () => {
 const {blogs, loading}  = useSelector((state) => state.blog);
 const dispatch=useDispatch();
  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  
  return (
    <div className='text-white'>
      <div className='w-full px-10 mt-10 max-w-6xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            { loading 
            ? Array.from({ length: 6 }).map((_, i) => <BlogSkeleton key={i} />)
            : blogs.map((blog, index) => 
              (
                <BlogCard key={index} {...blog} />
              )) 
            }
          </div>
      </div>
    </div>
  );
}

export default Blogs;
