import { FaUserCircle } from 'react-icons/fa'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LuUser } from "react-icons/lu";
import { LuChartColumnBig } from "react-icons/lu";


const ProfileDropdown = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton>
        <FaUserCircle className="text-white w-9 h-9 cursor-pointer " />
      </MenuButton>

      <MenuItems className="absolute right-0 mt-1 w-40 p-2 origin-top-right bg-[#111] border border-[#2a2a2a] divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="px-1 py-1 flex flex-col  text-white">
          <MenuItem>
            {() => (
              <button
                 className={`text-white flex items-center gap-1.5 hover:bg-[#2b2b2bbd] hover:rounded-xl px-4 py-2 text-left cursor-pointer`}
              >
                <LuUser />
                Profile
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {() => (
              <button
                className={`text-white flex items-center gap-1.5 hover:bg-[#2b2b2bbd] hover:rounded-xl  px-4 py-2 text-left cursor-pointer`}
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