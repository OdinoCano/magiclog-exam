import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import { AlertProvider } from "./components/Alert/AlertContext";
import api from './services/api';

const theme = createTheme();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'seller' | 'admin' | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = useMemo(() => location.pathname, [location.pathname]);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setUserName(null);
    setUserRole(null);
    localStorage.removeItem('token');

    if (currentPath !== '/') {
      navigate('/');
    }
  }, [currentPath, navigate]);

  const validateToken = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        handleLogout();
        return;
      }

      const response = await api.post('/auth/validate');
      if (response.data) {
        setIsAuthenticated(true);
        setUserRole(response.data.role);
        const role = response.data.role;
        if (role === 'admin' && window.location.pathname !== '/admin') {
          navigate('/admin');
        } else if (role === 'seller' && window.location.pathname !== '/products') {
          navigate('/products');
        } else if (!role && window.location.pathname !== '/') {
          navigate('/');
        }
      } else {
        handleLogout();
      }
    } catch (error) {
      handleLogout();
    }
  }, [handleLogout]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  useEffect(() => {
    const syncLogout = (e: StorageEvent) => {
      if (e.key === 'token' && e.oldValue && !e.newValue) {
        handleLogout();
      }
    };

    window.addEventListener('storage', syncLogout);
    return () => window.removeEventListener('storage', syncLogout);
  }, [handleLogout]);

  const handleLogin = (role: 'seller' | 'admin', name: string | null) => {
    setIsAuthenticated(true);
    setUserName(name);
    setUserRole(role);
    setOpenLoginModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlertProvider>
        <Navbar
          isAuthenticated={isAuthenticated}
          userName={userName}
          onLoginClick={() => setOpenLoginModal(true)}
          onLogoutClick={handleLogout}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/products" //
            element={<ProductPage isAuthenticated={isAuthenticated} userRole={userRole} />}
          />
          <Route
            path="/admin"
            element={<AdminPage isAuthenticated={isAuthenticated} userRole={userRole} />}
          />
        </Routes>
        <LoginModal
          open={openLoginModal}
          onClose={() => setOpenLoginModal(false)}
          onLogin={handleLogin}
        />
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
