import './index.css'
import './App.css'
import AppRouter from './AppRouter'
import { BrowserRouter as Router } from 'react-router-dom'

function App() { 
  return (
    <>
        <div className='flex h-screen'>
          <Router>
          <AppRouter/>
          </Router>
         
        </div>
    </>
  )
}

export default App
