import React, { useState } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const user = {
    username: "P Saikrishna",
    email: "spasupul11@gitam.in",
    contact: "+91 83286 81612",
    bio: "",
    occupation: "",
    photoUrl: "",
    instagram: "",
    linkedin: "",
    github: "",
    facebook: ""
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-[#000000] text-white">
      <div className="w-64 p-4 border-r border-[#2a2a2a]">
        <div className="space-y-2">
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === "personal" ? "bg-orange-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("personal")}
          >
            Personal Detail
          </button>
          <button
            className={`block w-full text-left px-4 py-2 rounded ${
              activeTab === "social" ? "bg-orange-600" : "hover:bg-gray-700"
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
            <div className="flex items-center space-x-4">
              <img
                src={user.photoUrl || "/default-avatar.png"}
                alt="profile"
                className="w-24 h-24 rounded-full bg-gray-600"
              />
              <div>
                <p className="text-sm text-gray-400">Profile Photo</p>
                <p className="text-xs text-gray-500">PNG, JPG (Max. 1MB)</p>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                className="bg-[#2c2c2e] w-full p-2 rounded"
                defaultValue={user.username}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                className="bg-[#2c2c2e] w-full p-2 rounded"
                defaultValue={user.email}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Bio</label>
              <input
                className="bg-[#2c2c2e] w-full p-2 rounded"
                defaultValue={user.bio}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Occupation</label>
              <input
                className="bg-[#2c2c2e] w-full p-2 rounded"
                defaultValue={user.occupation}
              />
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="space-y-6 p-6">
            <div>
              <label className="block text-sm mb-1">Instagram</label>
              <input
                className="bg-[#2c2c2e] w-full p-2 rounded"
                defaultValue={user.instagram}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">LinkedIn</label>
              <input
                className="bg-[#2c2c2e] w-full p-2 rounded"
                defaultValue={user.linkedin}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">GitHub</label>
              <input
                className="bg-[#2c2c2e] w-full p-2 rounded"
                defaultValue={user.github}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Facebook</label>
              <input
                className="bg-[#2c2c2e] w-full p-2 rounded"
                defaultValue={user.facebook}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
