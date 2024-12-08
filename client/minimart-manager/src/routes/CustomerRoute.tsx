import { Route, Routes } from 'react-router-dom';
import Home from '../pages/customer/Home';
import CustomerCategory from '../pages/customer/CustomerCategory';
import CustomerProductDetail from '../pages/customer/CustomerProductDetail';
import Unauthorized from '../pages/Unauthorized/Unauthorized';
import CustomerCheckout from '../pages/customer/CustomerCheckout';

function CustomerRoute() {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="category/:id" element={<CustomerCategory />} />
            <Route path="product/:id" element={<CustomerProductDetail />} />
            <Route path='checkout' element={<CustomerCheckout />} />
            <Route path='/unauthorized' element={<Unauthorized />} />

        </Routes>
    );
};

export default CustomerRoute;