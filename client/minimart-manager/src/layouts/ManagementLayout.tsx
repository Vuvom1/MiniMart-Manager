import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import AppHeader from './Header/AppHeader';
import SideMenu from './SideMenu/SideMenu';
import { useLocation } from 'react-router-dom';

const CustomerLayout = ({ children }: { children: ReactNode }) => {
    const [sideLayoutVisible, setSideLayoutVisible] = useState(false);
    const [sideMenuInvisible, setSideMenuInvisible] = useState(false);
    const location = useLocation();

    const handleRouteChange = () => {
        const path = window.location.pathname;
        if (path.includes('login') || path.includes('signup')) {
            setSideLayoutVisible(false);
        } else {
            setSideLayoutVisible(true);
        }
        if (path.includes('user-profile')) {
            setSideMenuInvisible(true);
        } else {
            setSideMenuInvisible(false);
        }
    };

    useEffect(() => {
        handleRouteChange();
    }, [location.pathname]);

    return (
        <>
            <div className={`flex w-screen h-screen overflow-y-hidden`}>
                {sideLayoutVisible && !sideMenuInvisible && <SideMenu />}
                <div className='flex flex-col h-full w-full'>
                    {sideLayoutVisible && <AppHeader />}
                    <div className={`h-full overflow-y-auto ${sideLayoutVisible && 'ml-4 mr-4 mt-4'}`}>
                        {children}
                    </div>
                </div>

            </div>
        </>
    );
};

export default CustomerLayout;
