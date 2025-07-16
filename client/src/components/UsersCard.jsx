import React from 'react';
import {FaRegUser } from 'react-icons/fa'
import { FiTrash2 } from 'react-icons/fi';

const UsersCard = ({ _id, username,photo, email, onDelete }) => {
  return (
    <div className="bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 flex items-center justify-between hover:scale-[1.02] transition duration-300">
      <div className="text-white">
        {photo?(<img src={photo} alt="" className='h-9 w-9 rounded-full object-cover'/>):(<FaRegUser  className="text-white w-9 h-9 cursor-pointer " />)}
      </div>

      <div className="flex-1 px-4">
        <h2 className="text-white text-lg font-semibold">{username}</h2>
        <p className="text-gray-400 text-sm">{email}</p>
      </div>

      <button
        onClick={() => onDelete(_id, username)}
        className="text-red-500 hover:text-red-700 p-2 rounded-full cursor-pointer"
        title="Delete User"
      >
        <FiTrash2 className="h-6 w-6" />
      </button>
    </div>
  );
};

export default UsersCard;
