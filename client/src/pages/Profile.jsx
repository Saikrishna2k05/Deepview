import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import {setPhoto} from '../redux/userSlice.js'
import {useDispatch} from 'react-redux'
import { LuPencil  } from "react-icons/lu";


const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [uploading, setUploading] = useState(false);
  const dispatch=useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/profile', {
          withCredentials: true,
        });
        if (!response.data.success) return;
        const profileDetails = response.data.details[0];
        reset(profileDetails);
      } catch (err) {
        toast.error("Failed to load profile data.");
      }
    };
    getDetails();
  }, [reset]);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUDNAME);
    try {
      setUploading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUDNAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      reset({ ...watch(), photoUrl: data.secure_url });
      toast.success("Photo uploaded successfully!");
    } catch (err) {
      toast.error("Photo upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data) => {
    const updateProfile = async () => {
      try {
        const res = await axios.put(
          'http://localhost:3000/user/updateProfile',
          data,
          { withCredentials: true }
        );
        dispatch(setPhoto(data.photoUrl));
        if (!res.data.success) return toast.error("Update failed");
        toast.success("Profile updated successfully!");
      } catch (err) {
        const message = err?.message || "Something went wrong";
        toast.error(message);
      }
    };
    updateProfile();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-[calc(100vh-4rem)] bg-black text-white"
    >
      <div className="w-64 p-4 border-r border-[#2a2a2a]">
        <div className="space-y-2">
          <button
          type="button"
          className={`block w-full text-left font-semibold px-4 py-2 rounded cursor-pointer transition-colors duration-150 ${
            activeTab === "personal"
              ? "bg-[#01b19d] text-black"
              : "text-white hover:bg-[#01b19cdd]"
          }`}
          onClick={() => setActiveTab("personal")}
        >
          Personal Details
        </button>

          <button
          type="button"
          className={`block w-full text-left font-semibold px-4 py-2 rounded cursor-pointer transition-colors duration-150 ${
            activeTab === "social"
              ? "bg-[#01b19d] text-black"
              : "text-white hover:bg-[#01b19cdd]"
          }`}
          onClick={() => setActiveTab("social")}
        >
          Social Links
        </button>

        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === "personal" && (
          <div className="space-y-6 p-6">
            <div className="relative w-24 h-24">
  <img
    src={watch("photoUrl") || "/default-avatar.png"}
    alt="profile"
    className="w-full h-full rounded-full bg-[#2a2a2a] object-cover"
  />
  
  <label
    htmlFor="photoInput"
    className="absolute inset-0 rounded-full overflow-hidden cursor-pointer group"
  >
    <img
      src={watch("photoUrl") || "/default-avatar.png"}
      alt="overlay"
      className="w-full h-full object-cover opacity-0 group-hover:opacity-40 group-hover:blur-lg transition-all"
    />
    
    <div className="absolute inset-0 flex items-center justify-center">
      {uploading ? (
        <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full" />
      ) : (
        <LuPencil className='h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity'/>
      )}
    </div>

    <input
      type="file"
      accept="image/*"
      id="photoInput"
      onChange={handlePhotoChange}
      className="hidden"
    />
  </label>
</div>

            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                {...register("username", { required: "Username is required" })}
                className="bg-[#2a2a2a] w-full p-2 rounded"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                className="bg-[#2a2a2a] w-full p-2 rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Bio</label>
              <input
                {...register("bio")}
                className="bg-[#2a2a2a] w-full p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Occupation</label>
              <input
                {...register("occupation")}
                className="bg-[#2a2a2a] w-full p-2 rounded"
              />
            </div>
            <div >
          <button
            type="submit"
            className="bg-[#01b19d] p-2.5 w-full mb-4 mt-4 font-semibold text-black rounded hover:bg-[#01b19cdd] cursor-pointer"
          >
            Save Changes
          </button>
        </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="space-y-6 p-6">
            <div>
              <label className="block text-sm mb-1">Instagram</label>
              <input
                {...register("instagram")}
                className="bg-[#2a2a2a] w-full p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">LinkedIn</label>
              <input
                {...register("linkedin")}
                className="bg-[#2a2a2a] w-full p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">GitHub</label>
              <input
                {...register("github")}
                className="bg-[#2a2a2a] w-full p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Facebook</label>
              <input
                {...register("facebook")}
                className="bg-[#2a2a2a] w-full p-2 rounded"
              />
            </div>
            <div >
          <button
            type="submit"
            className="bg-[#01b19d] p-2.5 w-full mb-4 mt-4 font-semibold text-black rounded hover:bg-[#01b19cdd] cursor-pointer"
          >
            Save Changes
          </button>
        </div>
          </div>
        )}

      </div>
    </form>
  );
};

export default Profile;
