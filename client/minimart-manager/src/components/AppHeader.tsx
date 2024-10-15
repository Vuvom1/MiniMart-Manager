import Avatar from "./Avatar";
import CircleButton from "./CircleButton";
import TextField from "./TextField";
import { Popover } from '@headlessui/react';

function AppHeader() {
    return <div className="shadow-md py-4 px-4 w-full flex align-middle bg-white">
        <div className="w-2/5">
            <TextField placeholder="Search something here..."
                prefix={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                } />
        </div>

        <div className="flex gap-x-4 justify-end flex-1">
            <CircleButton
                onClick={() => alert('Icon Button Clicked!')}
                size="40px"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                    </svg>

                }
            />

            <div className="h-full w-px bg-gray-300"></div>

            <Avatar src="https://via.placeholder.com/150" alt="User Avatar" />

            <Popover className="relative align-middle">
                <Popover.Button className="bg-blue-500 flex gap-x-2 bg-white rounded-md text-black">
                    <div className="text-start">
                        <p className="font-semibold">Username</p>
                        <p className="text-slate-500">username@gmail.com</p>
                    </div>
                    <div className="h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
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
                        <button className="text-gray-700 hover:bg-gray-100 px-12 py-2 rounded-md">
                            Logout
                        </button>
                    </div>
                </Popover.Panel>
            </Popover>

        </div>

    </div>
}

export default AppHeader;
