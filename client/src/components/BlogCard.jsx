import React from 'react';

const BlogCard = ({ image, title, author, category, date, excerpt }) => {
  return (
    <div className="bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden transition duration-300 hover:scale-[1.02] flex flex-col">
      
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-gray-400 mb-1">
          By {author} | {category} | {date}
        </p>

        <h2 className="text-white font-semibold text-lg mb-2">{title}</h2>

        <p className="text-gray-400 text-sm mb-4">{excerpt}</p>

        <div className="mt-auto">
          <button className="bg-white text-black px-3 py-1 rounded-md text-sm font-medium hover:bg-[#ffffffcc]">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
