import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import SideMenu from '../components/SideMenu/SideMenu';
import AppHeader from '../components/AppHeader';
import CustomerManage from '../pages/CustomerManagement/CustomerManange';
import PromotionManage from '../pages/PromotionManagement/PromotionManage';
import Login from '../pages/Authientication/Login';
import Signup from '../pages/Authientication/Signup';
import PrivateRoute from './PrivateRoute';
import { Role } from '../components/constant/enum';
import SuppliesPackageRoot from './SupplyRoutes';
import Unauthorized from '../pages/Unauthorized/Unauthorized';
import { useAuth } from '../components/providers/AuthProvider';
import { useEffect, useState } from 'react';

const AppRouter = () => {
    const location = useLocation();
    const { user, loading } = useAuth();
    const [hideLayout, setHideLayout] = useState(true);
    const userRole = user?.role;

    useEffect(() => {
        setHideLayout(user == null || location.pathname === '/unauthorized');
    }, [user, location.pathname]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {!hideLayout && <SideMenu />}
            <div className='flex flex-col w-full'>
                {!hideLayout && <AppHeader />}
                <div className={`h-full ${hideLayout ? '' : 'mt-6 ml-6 mr-6'} overflow-y-auto`}>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />

                        <Route element={<PrivateRoute userRole={userRole} allowedRoles={[Role.ADMIN]} />}>
                        </Route>

                        <Route element={<PrivateRoute userRole={userRole} allowedRoles={[Role.ADMIN, Role.MANAGER]} />}>

                            <Route path="supplies/*" element={<SuppliesPackageRoot />} />
                            <Route path='/promotions' element={<PromotionManage />} />
                        </Route>

                        <Route element={<PrivateRoute userRole={userRole} allowedRoles={[Role.ADMIN, Role.MANAGER, Role.STAFF]} />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path='/customers' element={<CustomerManage />} />
                        </Route>

                        <Route path='/unauthorized' element={<Unauthorized />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default AppRouter;