import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import React, { Suspense } from 'react'
import './App.css'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Payment from './pages/Payment'

// Components
import ProtectedRoute from './components/ProtectedRoute'

// Context
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

// Lazy load admin components
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard'))
const Apps = React.lazy(() => import('./pages/admin/Apps'))
const Customers = React.lazy(() => import('./pages/admin/Customers'))
const Subscriptions = React.lazy(() => import('./pages/admin/Subscriptions'))
const Users = React.lazy(() => import('./pages/admin/Users'))
const Settings = React.lazy(() => import('./pages/admin/Settings'))

// Theme is now managed by ThemeContext

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<Payment />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              {/* Add any protected routes here */}
            </Route>
            
            {/* Admin routes */}
            <Route element={<ProtectedRoute requireAdmin={true} />}>
              <Route path="/admin/dashboard" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminDashboard />
                </Suspense>
              } />
              <Route path="/admin/apps" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Apps />
                </Suspense>
              } />
              <Route path="/admin/customers" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Customers />
                </Suspense>
              } />
              <Route path="/admin/subscriptions" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Subscriptions />
                </Suspense>
              } />
              <Route path="/admin/users" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Users />
                </Suspense>
              } />
              <Route path="/admin/settings" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Settings />
                </Suspense>
              } />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
