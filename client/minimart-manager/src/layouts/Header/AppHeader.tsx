
import { Popover } from '@headlessui/react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../providers/AuthProvider';
import TextField from '../../components/InputField/TextField';
import CircleButton from '../../components/Button/CircleButton';
import Avatar from '../../components/Avatar';
import Urls from '../../constant/urls';


function AppHeader() {
    const navigate = useNavigate();
    const auth = useAuth();

    function handleLogout() {
        auth.logout(),
        
        navigate('login')
    }
    

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

            <Avatar size="50px" src={auth?.user?.image} />

            <div onClick={() => navigate(Urls.ADMIN.USER_PROFILE.Path)} className="text-start mr-4 cursor-pointer hover:underline">
                <p className="font-semibold">{auth?.user?.username}</p>
                <p className="text-slate-500">{auth?.user?.email}</p>
            </div>
        </div>

    </div>
}

export default AppHeader;
