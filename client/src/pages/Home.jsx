import React from 'react'
import HomeImg from '../assets/home-img.png'
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

const Home = () => {
  const navigate=useNavigate();
  const recentBlogs = [
  {
    title: 'How to do search engine optimization',
    author: 'Rahul',
    category: 'Digital Marketing',
    date: '05/05/2025',
    excerpt: 'This is the subtitle for how to make an Ecommerce website',
    image: 'https://www.rgbwebtech.com/blogs/images/uploads/what-is-seo-search-engin-optimization.png' // Replace with real images later
  },
  {
    title: 'Mastering Minimalist Design',
    author: 'Aisha',
    category: 'UI/UX',
    date: '06/05/2025',
    excerpt: 'Understanding the power of less and how it enhances focus.',
    image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240719115108/minimalism-in-web-design.webp'
  },
  {
    title: 'The Psychology of Colors in Branding',
    author: 'Karan',
    category: 'Branding',
    date: '07/05/2025',
    excerpt: 'Colors influence decision-making more than you think.',
    image: 'https://miro.medium.com/v2/resize:fit:1200/1*edHRS32A-zEyJDZ4_qiCMA.jpeg'
  },
  {
    title: 'The Psychology of Colors in Branding',
    author: 'Karan',
    category: 'Branding',
    date: '07/05/2025',
    excerpt: 'Colors influence decision-making more than you think.',
    image: 'https://miro.medium.com/v2/resize:fit:1200/1*edHRS32A-zEyJDZ4_qiCMA.jpeg'
  },
  {
    title: 'The Psychology of Colors in Branding',
    author: 'Karan',
    category: 'Branding',
    date: '07/05/2025',
    excerpt: 'Colors influence decision-making more than you think.',
    image: 'https://miro.medium.com/v2/resize:fit:1200/1*edHRS32A-zEyJDZ4_qiCMA.jpeg'
  },
  {
    title: 'The Psychology of Colors in Branding',
    author: 'Karan',
    category: 'Branding',
    date: '07/05/2025',
    excerpt: 'Colors influence decision-making more than you think.',
    image: 'https://miro.medium.com/v2/resize:fit:1200/1*edHRS32A-zEyJDZ4_qiCMA.jpeg'
  }

]

  return (
    <>
    <div className='text-white flex items-center justify-center p-6'>
      <div className='flex flex-col'>
        <h1 className='ml-10 p-10 text-5xl font-bold'>Explore Ideas, Discover Depth & Share your views.</h1>
        <h4 className='ml-10 p-10 pt-0 text-xl  leading-relaxed'>Where thoughts meet clarity — DeepView is your gateway to insightful perspectives, untold stories, and deeper understanding beyond the surface.</h4>
        <div className='flex'>
          <button className='ml-20 p-2 text-black bg-white rounded-xl w-1/2 cursor-pointer hover:bg-[#ffffffcd]' onClick={()=>{navigate('/login')}}>Get Started</button>
        <button className='ml-2 p-2 text-white bg-black border-2 border-[#2a2a2a] rounded-xl w-1/2 hover:bg-[#2a2a2a85] cursor-pointer' onClick={()=>{navigate('/about')}}>Learn More</button>
        </div>
      </div>
      <img src={HomeImg} alt="" className='w-[26rem]'/>
    </div>


    <div className='text-white'>
      <div className='w-full px-10 mt-10 max-w-6xl'>
        <h2 className='text-4xl font-bold mb-6 border-b pb-2 border-[#2a2a2a] text-center'>Recent Blogs</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {recentBlogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </div>

    </>
  )
}

export default Home