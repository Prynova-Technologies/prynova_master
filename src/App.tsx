import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box, CircularProgress, CssBaseline } from '@mui/material';
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
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <CssBaseline />
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
                <Suspense fallback={
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                    >
                        <CircularProgress />
                    </Box>
                }>
                  <AdminDashboard />
                </Suspense>
              } />
              <Route path="/admin/apps" element={
                <Suspense fallback={<Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <CircularProgress />
                </Box>}>
                  <Apps />
                </Suspense>
              } />
              <Route path="/admin/customers" element={
                <Suspense fallback={<Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <CircularProgress />
                </Box>}>
                  <Customers />
                </Suspense>
              } />
              <Route path="/admin/subscriptions" element={
                <Suspense fallback={<Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <CircularProgress />
                </Box>}>
                  <Subscriptions />
                </Suspense>
              } />
              <Route path="/admin/users" element={
                <Suspense fallback={<Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <CircularProgress />
                </Box>}>
                  <Users />
                </Suspense>
              } />
              <Route path="/admin/settings" element={
                <Suspense fallback={<Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <CircularProgress />
                </Box>}>
                  <Settings />
                </Suspense>
              } />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
