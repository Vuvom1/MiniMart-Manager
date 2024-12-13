import { Popover } from '@headlessui/react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Category } from "../../data/Entities/Category";
import { getAllCategories } from "../../services/api/CategoryApi";
import { useAuth } from "../../providers/AuthProvider";
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/16/solid';
import { CartContext } from '../../contexts/CartContext';
import Urls from '../../constant/urls';
import Avatar from '../../components/Avatar';

interface CustomerHeaderProps {
  onCartOpen: () => void;
}

function CustomerHeader({ onCartOpen }: CustomerHeaderProps) {
  const navigate = useNavigate();
  const auth = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const cartContext = useContext(CartContext);
  const totalItems = cartContext ? cartContext.totalItems : 0;
  const user = auth.user;

  function handleLogout() {
    auth.logout();
    navigate(Urls.CUSTOMER.BASE);
  }

  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.log(error);
    }
  }

  const onCategoryClick = (id: string) => {
    navigate(`${Urls.CUSTOMER.CATEGORY.Path}/${id}`);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="shadow-sm py-2 px-4 w-full flex bg-white items-center rounded-lg">
      <Popover className="relative">
        <Popover.Button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </Popover.Button>
        <Popover.Panel className="absolute z-10 py-4 bg-white border min-w-96 border-gray-200 rounded-lg mt-2 shadow-lg">
          <div className="flex flex-col space-y-2 ">
            {categories.map((category) => (
              <button key={category._id} onClick={() => onCategoryClick(category._id)} className="flex justify-between text-gray-700 hover:bg-gray-100 py-1 pl-12 pr-2 rounded-md text-start text-lg">
                {category.name}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            ))}
          </div>
        </Popover.Panel>
      </Popover>

      <a onClick={() => navigate('/minimartonline')}>
        <span className="material-icons mr-2 flex gap-x-1 py-2 px-2">
          <p className="font-semibold text-2xl text-cyan-500">MINIMART</p>
          <p className="font-semibold text-2xl">Online</p>
        </span>
      </a>

      <div className='flex items-center gap-x-8 mx-6 text-gray-500'>
      <p className='cursor-pointer'>About us</p>
      <p className='cursor-pointer'>Wishlist</p>
        <p onClick={() => navigate(Urls.CUSTOMER.ORDER_TRACKING.Path)} className='cursor-pointer'>Order tracking</p>
      </div>

      <div className="flex gap-x-6 justify-end flex-1">

        <div className="ml-auto flex items-center">

          <div className="hidden lg:ml-8 lg:flex">
            <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
              <img
                alt=""
                src="https://tailwindui.com/plus/img/flags/flag-canada.svg"
                className="block h-auto w-5 shrink-0"
              />
              <span className="ml-3 block text-sm font-medium">CAD</span>
              <span className="sr-only">, change currency</span>
            </a>
          </div>


          <div className="flex lg:ml-6">
            <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Search</span>
              <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
            </a>
          </div>

          <div className="ml-4 flow-root lg:ml-6">
            <a onClick={onCartOpen} className="group -m-2 flex items-center p-2">
              <ShoppingBagIcon
                aria-hidden="true"
                className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{totalItems}</span>
              <span className="sr-only">items in cart, view bag</span>
            </a>
          </div>
        </div>
        {user ? (
          <div className='flex gap-x-4'>
            <Avatar size="50px" src={auth?.user?.image} />
            <Popover className="relative align-middle">
                <Popover.Button className="flex items-center gap-x-2 bg-white rounded-md text-black">
                    <div className="text-start">
                        <p className="font-semibold">{auth?.user?.username}</p>
                        <p className="text-slate-500">{auth?.user?.email}</p>
                    </div>
                    <div className="h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                    </div>

                   

                </Popover.Button>

                <Popover.Panel className="absolute z-10 bg-white border border-gray-200 rounded-lg mt-2 shadow-lg">
                    <div className="flex flex-col space-y-2">
                        <button className="text-gray-700 hover:bg-gray-100 px-12 py-2 rounded-md">
                            Profile
                        </button>
                        <button className="text-gray-700 hover:bg-gray-100 px-12 py-2 rounded-md">
                            Settings
                        </button>
                        <button onClick={handleLogout} className="text-gray-700 hover:bg-gray-100 px-12 py-2 rounded-md">
                            Logout
                        </button>
                    </div>
                </Popover.Panel>
            </Popover>
          </div>
        ) : (
          <div className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-6">
            <a href={Urls.CUSTOMER.LOGIN.Path} className="text-sm font-medium text-gray-700 hover:text-gray-800">
              Sign in
            </a>
            <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
            <a href={Urls.CUSTOMER.SIGNUP.Path} className="text-sm font-medium text-gray-700 hover:text-gray-800">
              Create account
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerHeader;
