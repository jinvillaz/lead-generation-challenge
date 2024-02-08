import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LoginForm } from './views/LoginForm'
import { RegisterForm } from './views/RegisterForm'
import { HomeView } from './views/HomeView'
import { PublicView } from './views/PublicView'
import { Navbar } from './components/Navbar'
import { AuthProvider } from './hooks/useAuth'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminView } from './views/AdminView'
import { AccessDenied } from './views/AccessDenied'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<PublicView />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <HomeView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-zone"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminView />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
