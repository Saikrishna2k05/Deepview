import { useRef, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import axios from 'axios';
import toast from 'react-hot-toast'

const ThumbnailUpload = ({ field }) => {
  const [loading, setLoading] = useState(false);
  const handleChange = async (e) => 
    {
    const file = e.target.files[0];

      e.target.value = null;

    if (!file) return;    
    if(file.type!=='image/jpeg' && file.type!=='image/png' && file.type!=='image/webp')
    {
      toast.error('Only PNG/JPG/JPEG/WEBP files are allowed.')
      return;
    }
    if (file.size > 10 * 1024 * 1024) 
    { 
      toast.error('File too large. Max 10MB allowed.');
      return;
    }
    setLoading(true);

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);
    data.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUDNAME);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUDNAME}/image/upload`,
        data
      );
      field.onChange(response.data.url);
    } catch (err) {
      toast.error('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    field.onChange(null);
  };

  return (
    <div className="bg-[#111] border border-[#2a2a2a] rounded-xl p-6 mb-6">
      <h2 className="text-white text-lg font-semibold mb-4">Featured Image</h2>

      {!field.value ? (
        <label className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-600 ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#171717] hover:border-gray-400'} rounded-xl h-48 transition`}>
          {loading ? (
            <ImSpinner2 className="animate-spin text-2xl text-gray-400 mb-2" />
          ) : (
            <FaCloudUploadAlt className="text-3xl text-gray-400 mb-2" />
          )}
          <span className="text-white font-medium">
            {loading ? 'Uploading...' : 'Upload Image'}
          </span>
          <span className="text-sm text-gray-500">PNG, JPG, JPEG & WEBP files up to 10MB</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg,image/webp"
            onChange={handleChange}
            className="hidden"
            disabled={loading}
          />
        </label>
      ) : (
        <div className="flex justify-center mt-2">
          <div className="relative w-fit">
            <img
              src={field.value}
              alt="Thumbnail Preview"
              className="rounded-lg border border-[#2a2a2a] max-w-full h-auto"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailUpload;
