import './index.css'
import './App.css'
import AppRouter from './routes/AppRouters'
import { BrowserRouter as Router } from 'react-router-dom'
import {AuthProvider } from './components/providers/AuthProvider';

function App() {
  return (
    <>
      <div className='flex h-screen'>
        <AuthProvider>
          <Router>
            <AppRouter />
          </Router>
        </AuthProvider>
      </div>
    </>
  )
}

export default App
