import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated on initial load
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userRole = localStorage.getItem('userRole');
      const isAuth = !!token;
      
      setIsAuthenticated(isAuth);
      setIsAdmin(userRole === 'admin' || userRole === 'super_admin');
      setLoading(false);

      // Only redirect authenticated users from login page to dashboard
      if (isAuth && location.pathname === '/login') {
        navigate('/admin/dashboard', { replace: true });
      }
    };
    
    checkAuth();
  }, [location.pathname]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Call the admin login API
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:7001/api'}/admins/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store token and user role
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userRole', data.admin.role);
      
      // Update authentication state
      setIsAuthenticated(true);
      setIsAdmin(['admin', 'super_admin'].includes(data.admin.role));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const value = {
    isAuthenticated,
    isAdmin,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};