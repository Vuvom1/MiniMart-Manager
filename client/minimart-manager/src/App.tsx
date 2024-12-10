import './index.css'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider';
import { Toaster } from 'react-hot-toast';
import CustomerRoute from './routes/CustomerRoute';
import ManagementLayout from './layouts/ManagementLayout';
import ManagementRoute from './routes/ManagementRoute';
import CustomerLayout from './layouts/CustomerLayout';
import {CartProvider} from './providers/CartProvider';

function App() {
  return (
    <>
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
            <Routes>
              <Route path="/admin/*" element={<ManagementLayout><ManagementRoute /></ManagementLayout>} />
              <Route path="/minimartonline/*" element={<CustomerLayout><CustomerRoute/></CustomerLayout>} />
            </Routes>
          </Router>
          </CartProvider>
        </AuthProvider>
      </div>
    </>
  )
}

export default App
