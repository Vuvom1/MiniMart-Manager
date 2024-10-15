import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import ImportList from './pages/Import/ImportList';
import SideMenu from './components/SideMenu/SideMenu';
import AppHeader from './components/AppHeader';

const AppRouter = () => {
  return (
    <Router>
      <SideMenu />
      <div className='flex flex-col w-full'>
        <AppHeader />
        <div className="h-full mt-6 ml-6 mr-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/importList" element={<ImportList />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
};

export default AppRouter;