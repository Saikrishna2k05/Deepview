const UsersShimmer = () => {
  return (
    <div className="bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 flex items-center justify-between shimmer">
      <div className="h-9 w-9 rounded-full bg-[#2a2a2a]"></div>
      
      <div className="flex-1 px-4">
        <div className="h-4 w-32 bg-[#2a2a2a] rounded mb-2"></div>
        <div className="h-3 w-48 bg-[#2a2a2a] rounded"></div>
      </div>
      
      <div className="h-6 w-6 bg-[#2a2a2a] rounded-full"></div>
    </div>
  );
};

export default UsersShimmer;