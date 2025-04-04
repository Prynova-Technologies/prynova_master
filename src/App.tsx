import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
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

// Lazy load admin components
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard'))

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
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
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
