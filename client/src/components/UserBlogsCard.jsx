import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';
import {useNavigate} from 'react-router-dom'

const UserBlogsCard = ({ blog}) => {
    const navigate=useNavigate();
    function editHandler(id)
    {
        navigate(`/editBlog/${id}`);
    }
    function deleteHandler(id)
    {
        navigate(`/deleteBlog/${id}`);
    }
    const formattedDate = format(new Date(blog.createdAt), 'dd/MM/yy');
  return (
    <div className="flex flex-col sm:flex-row bg-[#1f1f1f] text-white rounded-xl border border-[#2a2a2a] p-4 gap-4 mb-8 hover:shadow-md transition-all">
      
      <img
        src={blog.thumbnail}
        alt="Thumbnail"
        className="w-full sm:w-32 h-48 sm:h-24 object-cover rounded-lg border border-[#2a2a2a]"
      />

      <div className="flex flex-col sm:flex-row flex-1 justify-between gap-2">
        
        <div className="flex-1">
          <h2 className="text-xl font-bold">{blog.title}</h2>
          <p className="text-gray-300">{blog.subtitle}</p>
          <p className="text-sm text-gray-400 mt-1">By {blog.author?.username || 'You'}</p>
        </div>

        <div className="flex sm:flex-col justify-between sm:items-end sm:text-right text-sm text-gray-400">
          <span> {formattedDate}</span>
          <div className="flex gap-3 mt-2 sm:mt-3 justify-end">
            <button onClick={()=>editHandler(blog._id)} className="hover:text-blue-400 cursor-pointer">
              <FiEdit size={18} />
            </button>
            <button onClick={() => deleteHandler(blog._id)} className="hover:text-red-400 cursor-pointer">
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserBlogsCard;
