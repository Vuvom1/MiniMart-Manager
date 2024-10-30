import './index.css'
import './App.css'
import AppRouter from './routes/AppRouters'
import { BrowserRouter as Router } from 'react-router-dom'
import {AuthProvider } from './components/providers/AuthProvider';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div className='flex h-screen'>
        <AuthProvider>
        <Toaster 
                position="top-center" 
                toastOptions={{
                    style: {
                        marginTop: '50px',
                    },
                }} 
            />
          <Router>
            <AppRouter />
          </Router>
        </AuthProvider>
      </div>
    </>
  )
}

export default App
