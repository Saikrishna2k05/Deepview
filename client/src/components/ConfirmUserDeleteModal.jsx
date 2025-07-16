import React from 'react';

const ConfirmUserDeleteModal = ({ isOpen, onClose, onConfirm, username }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#111] p-6 rounded-xl max-w-sm w-full text-white border border-[#2a2a2a] shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Delete User?</h2>
        <p className="text-gray-400 mb-6">
          This will permanently delete{' '}
          <span className="text-white font-stretch-semi-condensed">{username}</span> and{' '}
          <span className="text-red-500">all blogs written by them</span>. Are you sure you want to proceed?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#2a2a2a] bg-[#333] hover:bg-[#333333e1] transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 font-semibold transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUserDeleteModal;
