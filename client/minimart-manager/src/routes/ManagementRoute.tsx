import { Route, useLocation, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { Role } from '../constant/enum';
import Unauthorized from '../pages/Unauthorized/Unauthorized';
import { useAuth } from '../providers/AuthProvider';
import { ScheduleManagement } from '../pages/employee/ScheduleManagement/ScheduleManagement';
import Login from '../pages/employee/Authientication/Login';
import Signup from '../pages/employee/Authientication/Signup';
import SupplyManagement from '../pages/employee/SupplyManagement/SupplyManagement';
import ImportList from '../pages/employee/SupplyManagement/ImportList';
import AddImport from '../pages/employee/SupplyManagement/AddImport';
import EditImport from '../pages/employee/SupplyManagement/EditImport';
import PromotionManagement from '../pages/employee/PromotionManagement/PromotionManagement';
import AddPromotion from '../pages/employee/PromotionManagement/AddPromotion';
import EditPromotion from '../pages/employee/PromotionManagement/EditPromotion';
import Dashboard from '../pages/employee/Dashboard/Dashboard';
import CustomerManagement from '../pages/employee/CustomerManagement/CustomerManangement';

const AppRouter = () => {
    const { user, loading } = useAuth();
    const userRole = user?.role

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            <Route element={<PrivateRoute userRole={userRole} allowedRoles={[Role.ADMIN]} />}>
            </Route>

            <Route element={<PrivateRoute userRole={userRole} allowedRoles={[Role.ADMIN, Role.MANAGER]} />}>
                <Route path="supplies" >
                    <Route path="" element={<SupplyManagement />} />
                    <Route path='imports' element={<ImportList />} />
                    <Route path='imports/add' element={<AddImport />} />
                    <Route path='imports/:id' element={<EditImport />} />
                </Route>

                <Route path="promotions" >
                    <Route path="" element={<PromotionManagement />} />
                    <Route path='add' element={<AddPromotion />} />
                    <Route path=':id' element={<EditPromotion />} />
                </Route>
            </Route>

            <Route element={<PrivateRoute userRole={userRole} allowedRoles={[Role.ADMIN, Role.MANAGER, Role.STAFF]} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/customers' element={<CustomerManagement />} />
                <Route path='/schedule'>
                    <Route path='' element={<ScheduleManagement />} />
                </Route>
            </Route>

            <Route path='/unauthorized' element={<Unauthorized />} />
        </Routes>
    );
};

export default AppRouter;