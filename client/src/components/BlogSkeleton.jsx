import React from 'react';

const BlogSkeleton = () => {
  return (
    <div className="bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden flex flex-col animate-pulse">
      <div className="w-full h-48 bg-[#1f1f1f]" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-4 bg-[#2a2a2a] rounded w-2/3 mb-2" />
        <div className="h-5 bg-[#2a2a2a] rounded w-full mb-3" />
        <div className="h-4 bg-[#2a2a2a] rounded w-5/6 mb-4" />
        <div className="mt-auto">
          <div className="h-8 w-24 bg-[#2a2a2a] rounded" />
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
