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
import Urls from '../constant/urls';

const AppRouter = () => {
    const { user, loading } = useAuth();
    const userRole = user?.role

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            <Route path={Urls.ADMIN.LOGIN.Route} element={<Login />} />
            <Route path={Urls.ADMIN.SIGNUP.Route} element={<Signup />} />

            <Route element={<PrivateRoute userRole={userRole} allowedRoles={[Role.ADMIN]} />}>
            </Route>

            <Route element={<PrivateRoute userRole={userRole} allowedRoles={[Role.ADMIN, Role.MANAGER]} />}>
                <Route path={Urls.ADMIN.SUPPLIES.BASE.Route} >
                    <Route path="" element={<SupplyManagement />} />
                    <Route path={Urls.ADMIN.SUPPLIES.IMPORTS.BASE.Route} element={<ImportList />} />
                    <Route path={Urls.ADMIN.SUPPLIES.IMPORTS.ADD.Route} element={<AddImport />} />
                    <Route path={Urls.ADMIN.SUPPLIES.IMPORTS.EDIT.Route} element={<EditImport />} />
                </Route>

                <Route path={Urls.ADMIN.PROMOTIONS.BASE.Route} >
                    <Route path="" element={<PromotionManagement />} />
                    <Route path={Urls.ADMIN.PROMOTIONS.ADD.Route} element={<AddPromotion />} />
                    <Route path={Urls.ADMIN.PROMOTIONS.EDIT.Route} element={<EditPromotion />} />
                </Route>
            </Route>

            <Route element={<PrivateRoute userRole={userRole} allowedRoles={[Role.ADMIN, Role.MANAGER, Role.STAFF]} />}>
                <Route path={Urls.ADMIN.DASHBOARD.Route} element={<Dashboard />} />
                <Route path={Urls.ADMIN.CUSTOMERS.Route} element={<CustomerManagement />} />
                <Route path={Urls.ADMIN.SCHEDULE.Route}>
                    <Route path="" element={<ScheduleManagement />} />
                </Route>
            </Route>

            <Route path='/unauthorized' element={<Unauthorized />} />
        </Routes>
    );
};

export default AppRouter;