import { useEffect, useState } from 'react';
import { Role } from '../constant/enum';

import { ReactNode } from 'react';
import { useAuth } from '../providers/AuthProvider';
import AppHeader from './Header/AppHeader';
import SideMenu from './SideMenu/SideMenu';

const CustomerLayout = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();
    const userRole = user?.role;
    const [sideLayoutVisible, setSideLayoutVisible] = useState(false);

    useEffect(() => {
        if (userRole === Role.ADMIN || userRole === Role.MANAGER || userRole === Role.STAFF) {
            setSideLayoutVisible(true);
        }
    }, [userRole]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={`flex w-screen h-screen overflow-y-hidden`}>
                {sideLayoutVisible && <SideMenu />}
                <div className='flex flex-col h-full w-full'>
                    {sideLayoutVisible && <AppHeader />}
                    <div className={`h-full overflow-y-auto ${userRole && 'ml-4 mr-4 mt-4'}`}>
                        {children}
                    </div>
                </div>

            </div>
        </>
    );
};

export default CustomerLayout;
