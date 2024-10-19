import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import SideMenu from './components/SideMenu/SideMenu';
import AppHeader from './components/AppHeader';
import SupplyManagement from './pages/SupplyManagement/SupplyManagement';
import CustomerManage from './pages/CustomerManagement/CustomerManange';
import PromotionManage from './pages/PromotionManagement/PromotionManage';
import Login from './pages/Authientication/Login';
import Signup from './pages/Authientication/Signup';

const AppRouter = () => {

  const location = useLocation();
  const hideLayout = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideLayout && <SideMenu />}
      <div className='flex flex-col w-full'>
        {!hideLayout && <AppHeader />}
        <div className={`h-full ${hideLayout ? '' : 'mt-6 ml-6 mr-6'} overflow-y-auto`}>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/supplies" element={<SupplyManagement />} />
            <Route path='/customers' element={<CustomerManage />} />
            <Route path='/promotions' element={<PromotionManage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </div>

      </div></>


  );
};

export default AppRouter;