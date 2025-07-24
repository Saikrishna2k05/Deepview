import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAllBlogs } from '../redux/blogSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CategoryFilter() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  function categoryHandler(category)
  {
    if(category=='All')
    {
      navigate('/Blogs');
      dispatch(fetchAllBlogs({category: "" }));
      return;

    }
    const params=new URLSearchParams();
    params.set("category", category);
    navigate(`/Blogs?${params.toString()}`);
  }
  const categories=['All','Entertainment','Lifestyle','Tech','Education','Personal','Others'];
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex w-full justify-center items-center  rounded-md bg-[#111] border border-[#1f1f1f] px-4 py-2 text-sm font-medium cursor-pointer text-white hover:bg-[#111111d6] focus:outline-none">
          Category

          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-300" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-45 origin-top-right rounded-xl bg-[#1f1f1f] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-[#333] text-white">
          {
            categories.map((category)=>(
              <div key={category} className='px-1 py-1' >
              <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-[#2f2f2f]' : '',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer'
                  )}
                  onClick={()=>categoryHandler(category)}
                >
                  {category}
                </button>
              )}
            </Menu.Item>
              </div>
            ))
          }
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
