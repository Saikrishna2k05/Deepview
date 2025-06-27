const BlogReadSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto p-10 space-y-6">
      <div className="h-10 w-3/4 shimmer rounded-md"></div>
      <div className="h-6 w-2/3 shimmer rounded-md"></div>
      
      <div className="flex items-center gap-4 mt-6">
        <div className="w-10 h-10 shimmer rounded-full"></div>
        <div className="w-24 h-4 shimmer rounded-md"></div>
      </div>

      <div className="w-full h-[300px] shimmer rounded-lg mt-6"></div>

      <div className="space-y-3 mt-6">
        <div className="h-4 w-full shimmer rounded-md"></div>
        <div className="h-4 w-5/6 shimmer rounded-md"></div>
        <div className="h-4 w-2/3 shimmer rounded-md"></div>
        <div className="h-4 w-3/4 shimmer rounded-md"></div>
      </div>
    </div>
  );
};

export default BlogReadSkeleton;
