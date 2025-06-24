import { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const ThumbnailUpload = ({ thumbnail, setThumbnail }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail(reader.result); // base64
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setThumbnail(null);
    setPreview(null);
  };

  return (
    <div className="bg-[#111] border border-[#2a2a2a] rounded-xl p-6 mb-6">
      <h2 className="text-white text-lg font-semibold mb-4">Featured Image</h2>
      {!preview ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 hover:border-gray-400 cursor-pointer rounded-xl h-48 transition">
          <FaCloudUploadAlt className="text-3xl text-gray-400 mb-2" />
          <span className="text-white font-medium">Upload Image</span>
          <span className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="relative mt-2">
          <img
            src={preview}
            alt="Thumbnail Preview"
            className="max-w-full rounded-lg border border-[#2a2a2a]"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 cursor-pointer right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ThumbnailUpload;
