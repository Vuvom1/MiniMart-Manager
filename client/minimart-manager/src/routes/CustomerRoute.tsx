import { Route, Routes } from 'react-router-dom';
import Home from '../pages/customer/Home';
import CustomerCategory from '../pages/customer/CustomerCategory';
import CustomerProductDetail from '../pages/customer/CustomerProductDetail';
import Unauthorized from '../pages/Unauthorized/Unauthorized';
import CustomerCheckout from '../pages/customer/CustomerCheckout';
import CustomerLogin from '../pages/customer/Authentication/CustomerLogin';
import CustomerSignUp from '../pages/customer/Authentication/CustomerSignUp';
import Urls from '../constant/urls';
import OrderTracking from '../pages/customer/OrderTracking';

function CustomerRoute() {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path={Urls.CUSTOMER.LOGIN.Route} element={<CustomerLogin/>}/>
            <Route path={Urls.CUSTOMER.SIGNUP.Route} element={<CustomerSignUp/>}/>
            <Route path={Urls.CUSTOMER.CATEGORY.Route} element={<CustomerCategory />} />
            <Route path={Urls.CUSTOMER.PRODUCT.Route} element={<CustomerProductDetail />} />
            <Route path={Urls.CUSTOMER.CHECKOUT.Route} element={<CustomerCheckout />} />
            <Route path={Urls.CUSTOMER.ORDER_TRACKING.Route} element={<OrderTracking />} />
            <Route path='/unauthorized' element={<Unauthorized />} />

        </Routes>
    );
};

export default CustomerRoute;