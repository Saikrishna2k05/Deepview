import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import BlogCard from '../components/BlogCard.jsx'
import BlogSkeleton from '../components/BlogSkeleton.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '../redux/blogSlice.js';
import { useSearchParams } from 'react-router-dom';


const Blogs = () => {
 const {blogs, loading}  = useSelector((state) => state.blog);
 const dispatch=useDispatch();
 const [searchParams] = useSearchParams();
 const searchQuery = searchParams.get('search') || "";
  useEffect(() => {
    if(searchQuery === "" && blogs.length==0)
    {
    dispatch(fetchAllBlogs(searchQuery));
    }
  }, [dispatch, blogs.length, searchQuery]);
  return (
    <div className='text-white'>
      {(!loading && searchQuery && blogs.length==0)?(<div
    className="flex flex-col items-center justify-center text-white"
    style={{ height: 'calc(90vh - 4rem)' }}
  >
    <p className="text-lg sm:text-3xl font-medium mb-2">
      No blogs found for your search.
    </p>
    <p className="text-sm sm:text-xl font-thin text-white">
      Try a different keyword or check back later.
    </p>
  </div>) : 
  (<div className='w-full px-10 mt-10 max-w-6xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            { loading 
            ? Array.from({ length: 6 }).map((_, i) => <BlogSkeleton key={i} />)
            : blogs.map((blog, index) => 
              (
                <BlogCard key={blog._id} {...blog} />
              )) 
            }
          </div>
      </div>)}
      
    </div>
  );
}

export default Blogs;
