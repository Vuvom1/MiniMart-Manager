import { Popover } from '@headlessui/react';
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Category } from "../../data/Entities/Category";
import { getAllCategories } from "../../services/api/CategoryApi";
import { useAuth } from "../../providers/AuthProvider";
import CircleButton from '../../components/Button/CircleButton';
import Avatar from '../../components/Avatar';
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/16/solid';
import {CartContext} from '../../contexts/CartContext';

interface CustomerHeaderProps {
    onCartOpen: () => void;
}

function CustomerHeader({ onCartOpen }: CustomerHeaderProps) {
    const navigate = useNavigate();
    const auth = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const {totalItems} = useContext(CartContext);

    function handleLogout() {
        auth.logout();
        navigate('/login');
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
        navigate(`/minimartonline/category/${id}`);
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

            <div className="flex gap-x-4 justify-end flex-1">
               

                <div className="h-full w-px bg-gray-300"></div>

                {/* <Avatar size="50px" src={auth?.user?.image} alt="User Avatar" /> */}

                <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </a>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </a>
                </div>

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
            </div>
        </div>
    );
}

export default CustomerHeader;
