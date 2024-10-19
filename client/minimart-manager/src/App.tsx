import './index.css'
import './App.css'
import AppRouter from './routes/AppRouter'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider'

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
