const UserBlogsCardSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-[#1f1f1f] text-white rounded-xl border border-[#2a2a2a] p-4 gap-4 mb-8 hover:shadow-md transition-all">
      
      <div className="w-full sm:w-32 h-48 sm:h-24 bg-[#2a2a2a] shimmer rounded-lg border border-[#2a2a2a]"></div>

      <div className="flex flex-col sm:flex-row flex-1 justify-between gap-2">
        
        <div className="flex-1 space-y-2">
          <div className="w-3/4 h-6 bg-[#2a2a2a] shimmer rounded"></div>
          <div className="w-full h-4 bg-[#2a2a2a] shimmer rounded"></div>
          <div className="w-1/2 h-4 bg-[#2a2a2a] shimmer rounded mt-2"></div>
        </div>

        <div className="flex sm:flex-col justify-between sm:items-end sm:text-right text-sm text-gray-400">
          <div className="w-15 h-4 bg-[#2a2a2a] shimmer rounded"></div>
          <div className="flex gap-3 mt-2 sm:mt-3">
            <div className="w-6 h-6 bg-[#2a2a2a] shimmer rounded-3xl"></div>
            <div className="w-6 h-6 bg-[#2a2a2a] shimmer rounded-3xl"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserBlogsCardSkeleton;
