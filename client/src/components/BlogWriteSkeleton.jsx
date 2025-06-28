import React from 'react';

const BlogWriteSkeleton = () => {
  return (
    <div className="animate-pulse text-white m-8 space-y-6">
      <div className="h-16 bg-[#1a1a1a] rounded-xl" />
      <div className="h-14 bg-[#1a1a1a] rounded-xl" />
      <div className="h-[400px] bg-[#1a1a1a] rounded-xl" />
      <div className="h-48 bg-[#1a1a1a] rounded-xl" />
      <div className="h-20 bg-[#1a1a1a] rounded-xl" />
      <div className="h-12 bg-[#2a2a2a] rounded-xl w-full" />
    </div>
  );
};

export default BlogWriteSkeleton;
