import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import SideMenu from './components/SideMenu/SideMenu';
import AppHeader from './components/AppHeader';
import SupplyManagement from './pages/SupplyManagement/SupplyManagement';
import CustomerManage from './pages/CustomerManagement/CustomerManange';
import PromotionManage from './pages/PromotionManagement/PromotionManage';

const AppRouter = () => {
  return (
    <Router>
      <SideMenu />
      <div className='flex flex-col w-full'>
        <AppHeader />
        <div className="h-full mt-6 ml-6 mr-6 overflow-y-auto ">

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/supplies" element={<SupplyManagement />} />
            <Route path='/customers' element={<CustomerManage />} />
            <Route path='/promotions' element={<PromotionManage />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
};

export default AppRouter;