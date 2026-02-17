import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import "react-router-dom"
import './styles/index.css'
import Registration from './pages/registration.jsx'
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/home.jsx'
import AuthProvider from "./Context/AuthContext.jsx"
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute.jsx'
import AddTodo from './pages/addTodo.jsx'
import Completed from './pages/completed.jsx'
import Profile from './pages/profile.jsx'
import Active from './pages/activeDo.jsx'
import OverDue from './pages/overDue.jsx'
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from './FallbackUI/Fallback.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary  FallbackComponent={ErrorFallback}
      onReset={() => {
      }}>
    <AuthProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={ <Login/>} />
        <Route path='/registration' element={<Registration />} />
          <Route path='/home' element={<ProtectedRoute><Home /> </ProtectedRoute>} />
          <Route path='/add' element={<ProtectedRoute> <AddTodo /> </ProtectedRoute>} />
          <Route path='/completed' element={<ProtectedRoute><Completed /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/activeDo' element={<ProtectedRoute><Active /></ProtectedRoute>} />
           <Route path='/overdue' element={<ProtectedRoute><OverDue /></ProtectedRoute> } />
      </Routes>
      </BrowserRouter>
      </AuthProvider>
      </ErrorBoundary>
  </StrictMode>,
)
