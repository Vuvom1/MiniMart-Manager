import { Route, useLocation, Routes } from 'react-router-dom';
import { Role } from '../constant/enum';
import Unauthorized from '../pages/Unauthorized/Unauthorized';
import { useAuth } from '../providers/AuthProvider';
import { ScheduleManagement } from '../pages/employee/ScheduleManagement/ScheduleManagement';
import Login from '../pages/employee/Authientication/Login';
import Signup from '../pages/employee/Authientication/Signup';
import SupplyManagement from '../pages/employee/SupplyManagement/SupplyManagement';
import ImportList from '../pages/employee/SupplyManagement/ImportList';
import AddImport from '../pages/employee/SupplyManagement/AddImport';
import PromotionManagement from '../pages/employee/PromotionManagement/PromotionManagement';
import AddPromotion from '../pages/employee/PromotionManagement/AddPromotion';
import EditPromotion from '../pages/employee/PromotionManagement/EditPromotion';
import Dashboard from '../pages/employee/Dashboard/Dashboard';
import CustomerManagement from '../pages/employee/CustomerManagement/CustomerManangement';
import Urls from '../constant/urls';
import OrderManagement from '../pages/employee/Order/OrderManagement';
import ManageProduct from '../pages/employee/ProductManagement/ManageProduct';
import OrderDetail from '../pages/employee/Order/OrderDetail';
import EditImport from '../pages/employee/SupplyManagement/EditImport';
import { LoadingScreen } from '../components/Loading/LoadingScreen';
import UserProfile from '../pages/personalization/UserProfile';
import AddProduct from "../pages/employee/ProductManagement/AddProduct";
import EditProduct from "../pages/employee/ProductManagement/EditProduct";
import ManageEmployee from "../pages/employee/EmployeeManagement/ManageEmployee";
import EmployeeDetails from "../pages/employee/EmployeeManagement/EmployeeDetails";
import ManageReceipt from "../pages/employee/ReceiptManagement/ManageReceipt";


const AppRouter = () => {
  const {loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path={Urls.ADMIN.LOGIN.Route} element={<Login />} />

      <Route path={Urls.ADMIN.SIGNUP.Route} element={<Signup />} />

      <Route path={Urls.ADMIN.DASHBOARD.Route} element={<Dashboard />} />

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

      <Route path={Urls.ADMIN.ORDER.BASE.Route} >
        <Route path="" element={<OrderManagement />} />
        <Route path={Urls.ADMIN.ORDER.DETAIL.Route} element={<OrderDetail />} />
      </Route>

      <Route path={Urls.ADMIN.CUSTOMERS.Route} element={<CustomerManagement />} />

      <Route path={Urls.ADMIN.SCHEDULE.Route}>
        <Route path="" element={<ScheduleManagement />} />
      </Route>

      <Route path={Urls.ADMIN.PRODUCT.BASE.Route} >
        <Route path="" element={<ManageProduct />} />
      </Route>

      <Route path={Urls.ADMIN.PRODUCT.BASE.Route}>
        <Route path="" element={<ManageProduct />} />
        <Route
          path={Urls.ADMIN.PRODUCT.ADD.Route}
          element={<AddProduct></AddProduct>}
        />
        <Route
          path={Urls.ADMIN.PRODUCT.EDIT.Route}
          element={<EditProduct></EditProduct>}
        />
      </Route>
      <Route path={Urls.ADMIN.EMPLOYEE.BASE.Route}>
        <Route path="" element={<ManageEmployee />} />
        <Route
          path={Urls.ADMIN.EMPLOYEE.DETAILS.Route}
          element={<EmployeeDetails />}
        />
      </Route>
      <Route path={Urls.ADMIN.RECEIPT.BASE.Route}>
        <Route path="" element={<ManageReceipt />} />
      </Route>

      <Route path={Urls.ADMIN.USER_PROFILE.Route} element={<UserProfile />} />

      <Route path={Urls.ADMIN.UNAUTHORIZED.Route} element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRouter;
