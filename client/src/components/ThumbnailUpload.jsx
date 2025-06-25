import { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const ThumbnailUpload = ({field}) => {

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      field.onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => 
    {
    field.onChange(null)
  };

  return (
    <div className="bg-[#111] border border-[#2a2a2a] rounded-xl p-6 mb-6">
      <h2 className="text-white text-lg font-semibold mb-4">Featured Image</h2>
      {!field.value ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 hover:bg-[#171717] hover:border-gray-400 cursor-pointer rounded-xl h-48 transition">
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
