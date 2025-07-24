import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { FiTrash2 } from "react-icons/fi";

const BlogCard = ({ thumbnail, title, author, category, subtitle, createdAt, _id, onDelete }) => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.user?.role);
  const formattedDate = format(new Date(createdAt), 'dd/MM/yy');
  const readMoreHandler = () => {
    navigate(`/Blogs/${_id}`);
  };

  return (
    <div className="bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden transition duration-300 hover:scale-[1.02] flex flex-col">
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-gray-400 mb-1">
          By {author.username} | {category} | {formattedDate}
        </p>
        <h2 className="text-white font-semibold text-lg mb-2">{title}</h2>
        <p className="text-gray-400 text-sm mb-4">{subtitle}</p>
        <div className="mt-auto flex gap-1">
          <button
            className="bg-white text-black px-3 py-1 rounded-md text-sm font-medium hover:bg-[#ffffffcc] cursor-pointer"
            onClick={readMoreHandler}
          >
            Read More
          </button>
          {role === 'admin' && (
            <button
                    onClick={() => onDelete(_id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full cursor-pointer"
                    title="Delete User"
                  >
                    <FiTrash2 className="h-6 w-6" />
                  </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
