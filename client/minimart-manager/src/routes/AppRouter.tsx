import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import SideMenu from '../components/SideMenu/SideMenu';
import AppHeader from '../components/AppHeader';
import SupplyManagement from '../pages/SupplyManagement/SupplyManagement';
import CustomerManage from '../pages/CustomerManagement/CustomerManange';
import PromotionManage from '../pages/PromotionManagement/PromotionManage';
import Login from '../pages/Authientication/Login';
import Signup from '../pages/Authientication/Signup';
import PrivateRoute from '../routes/PrivateRoute';
import { useAuth } from '../providers/AuthProvider';
import { Role } from '../components/constant/enum';

const AppRouter = () => {
    const location = useLocation();
    const hideLayout = location.pathname === '/login' || location.pathname === '/signup';
    const {user} = useAuth();

    return (
        <>
            {!hideLayout && <SideMenu />}
            <div className='flex flex-col w-full'>
                {!hideLayout && <AppHeader />}
                <div className={`h-full ${hideLayout ? '' : 'mt-6 ml-6 mr-6'} overflow-y-auto`}>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                        
                        { (user?.role == Role.ADMIN) &&   <Route element={<PrivateRoute/>}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/supplies" element={<SupplyManagement />} />
                            <Route path='/customers' element={<CustomerManage />} />
                            <Route path='/promotions' element={<PromotionManage />} />
                        </Route>}
                      

                        { (user?.role == Role.MANAGER) &&   <Route element={<PrivateRoute/>}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/supplies" element={<SupplyManagement />} />
                            <Route path='/customers' element={<CustomerManage />} />
                            <Route path='/promotions' element={<PromotionManage />} />
                        </Route>}

                        { (user?.role == Role.STAFF) &&   <Route element={<PrivateRoute/>}>
                            <Route path='/customers' element={<CustomerManage />} />
                        </Route>}

                        <Route path='/unauthorized' element={<div>You do not have permission to access this page.</div>} />
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default AppRouter;
