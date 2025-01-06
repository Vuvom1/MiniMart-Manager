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
import UserProfile from '../pages/personalization/UserProfile';
import PaymentConfirm from '../pages/customer/PaymentConfirm';

function CustomerRoute() {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path={Urls.CUSTOMER.LOGIN.Route} element={<CustomerLogin/>}/>
            <Route path={Urls.CUSTOMER.SIGNUP.Route} element={<CustomerSignUp/>}/>
            <Route path={Urls.CUSTOMER.CATEGORRY.BASE.Route} element={<CustomerCategory />} >
                <Route path={Urls.CUSTOMER.CATEGORRY.DETAIL.Route} element={<CustomerCategory />} />
            </Route>
            <Route path={Urls.CUSTOMER.PRODUCT.Route} element={<CustomerProductDetail />} />
            <Route path={Urls.CUSTOMER.CHECKOUT.Route} element={<CustomerCheckout />} />
            <Route path={Urls.CUSTOMER.ORDER_TRACKING.Route} element={<OrderTracking />} />
            <Route path={Urls.CUSTOMER.PROFILE.Route} element={<UserProfile />} />
            <Route path={Urls.CUSTOMER.CONFIRM_PAYMENT.Route} element={<PaymentConfirm />} />
            <Route path='/unauthorized' element={<Unauthorized />} />

        </Routes>
    );
};

export default CustomerRoute;