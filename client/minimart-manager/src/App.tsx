import './index.css'
import './App.css'
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider';
import { Toaster } from 'react-hot-toast';
import CustomerRoute from './routes/CustomerRoute';
import ManagementLayout from './layouts/ManagementLayout';
import ManagementRoute from './routes/ManagementRoute';
import CustomerLayout from './layouts/CustomerLayout';
import {CartProvider} from './providers/CartProvider';
import Urls from './constant/urls'
import { setupInterceptors } from './services/api/Api';
import { useEffect } from 'react';

const AppWrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  return (
    <Routes>
      <Route path={`${Urls.ADMIN.BASE}/*`} element={<ManagementLayout><ManagementRoute /></ManagementLayout>} />
      <Route path={`${Urls.CUSTOMER.BASE}/*`} element={<CustomerLayout><CustomerRoute /></CustomerLayout>} />
    </Routes>
  );
};

function App() {
  return (
    <div className='flex h-screen'>
      <AuthProvider>
        <CartProvider>
          <Toaster 
            position="top-center" 
            toastOptions={{
              style: {
                marginTop: '50px',
              },
            }} 
          />
          <Router>
            <AppWrapper />
          </Router>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;