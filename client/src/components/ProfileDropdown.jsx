import { FaUserCircle } from 'react-icons/fa'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { LuUser } from "react-icons/lu";
import { LuChartColumnBig } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileDropdown = () => {
  const navigate=useNavigate();
  const pfp=useSelector((state)=>state.user.photoUrl);
  function userBlogsHandler()
  {
    navigate('/userBlogs');
  }
  function profileHandler(){
      navigate('/Profile');
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton>
        {
          pfp?(<img src={pfp} alt="" className='w-9 h-9 rounded-full object-cover cursor-pointer' />):
        (<FaUserCircle className="text-white w-9 h-9 cursor-pointer " />)
        }
      </MenuButton>

      <MenuItems className="absolute right-0 mt-1 w-40 p-2 origin-top-right bg-[#1f1f1f] border border-[#333] divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="px-1 py-1 flex flex-col  text-white">
          <MenuItem>
            {() => (
              <button
                 className={`text-white flex items-center gap-1.5 hover:bg-[#2f2f2f] hover:rounded-xl px-4 py-2 text-left cursor-pointer`}
                  onClick={profileHandler}
              >
                <LuUser />
                Profile
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {() => (
              <button
                className={`text-white flex items-center gap-1.5 hover:bg-[#2f2f2f] hover:rounded-xl  px-4 py-2 text-left cursor-pointer`}
                onClick={userBlogsHandler}
              >
                <LuChartColumnBig/>
                Your Blogs
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}

export default ProfileDropdown