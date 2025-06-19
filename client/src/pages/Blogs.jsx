import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import BlogCard from '../components/BlogCard.jsx'

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axios.get('http://localhost:3000/blog/getAll', {
          withCredentials: true
        });
        setBlogs(response.data.allBlogs);
      } catch (err) {
        toast.error("Couldn't fetch Blogs");
        console.error(err);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className='text-white'>
      <div className='w-full px-10 mt-10 max-w-6xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs;
