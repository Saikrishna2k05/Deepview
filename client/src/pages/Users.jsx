import React, { useEffect, useState } from 'react';
import UsersCard from '../components/UsersCard.jsx'; 
import { allUsers, deleteUser } from '../redux/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import ConfirmUserDeleteModal from '../components/ConfirmUserDeleteModal.jsx';
import UsersShimmer from '../components/UsersShimmer.jsx';

const Users = () => {
  const dispatch = useDispatch();
  const Users = useSelector((state) => state.user.Users);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const handleDeleteClick = (_id, username) => {
    setSelectedUser({_id, username});
    setIsModalOpen(true);
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {    
        setLoading(true);
        dispatch(allUsers()).unwrap();
      }
      catch(err) {
        toast.error(err?.message);
      }
      finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [dispatch])

  const confirmDelete = () => {
    try{
    dispatch(deleteUser(selectedUser?._id)).unwrap();
    toast.success("Successfully deleted the User");
    setIsModalOpen(false);
    setSelectedUser(null);
    }
    catch(err)
    {
      toast.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-white text-2xl font-bold mb-6">All Users</h1>
      
      {loading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <UsersShimmer key={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {Users.map((user) => (
            <UsersCard
              key={user._id}
              _id={user._id}
              photo={user.photoUrl}
              username={user.username}
              email={user.email}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      <ConfirmUserDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        username={selectedUser?.username}
      />
    </div>
  );
};

export default Users;