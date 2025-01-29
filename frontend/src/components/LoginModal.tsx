// components/LoginModal.tsx
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import api from '../services/api';
import { useAlert } from './Alert/AlertContext';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  open: boolean; // Prop para controlar si el modal está abierto
  onClose: () => void; // Prop para cerrar el modal
  onLogin: (role: 'seller' | 'admin', name: string | null) => void; // Prop para manejar el login
}

function decodeJWT(token: string): any {
  try {
    // Divide el token en sus partes: header, payload y signature
    const [_, payload] = token.split('.');

    // Decodifica el payload (que está en Base64Url)
    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload;
  } catch (error) {
    console.error('Error al decodificar el token JWT:', error);
    return null;
  }
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      showAlert({
        message: "Las contraseñas no coinciden",
        severity: "error",
        title: "Error",
      });
      return;
    }
    try {
      const response = await api.post('/auth/register', { email, password });
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        const payload = decodeJWT(response.data.access_token); // Decodifica el token
        const userRole = payload.role;
        const userName = payload.email;
        onLogin(userRole, userName);
        onClose();
        if(userRole === 'admin'){
          navigate('/admin')
        }else if (userRole === 'seller') {
          window.location.href = '/products';
        }
      }
    } catch (err) {
      showAlert({
        message: "El usuario ya existe o hubo un error",
        severity: "error",
        title: "Error",
      });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        const payload = decodeJWT(response.data.access_token); // Decodifica el token
        const userRole = payload.role;
        const userName = payload.email;
        onLogin(userRole, userName);
        onClose();
        if(userRole === 'admin'){
          navigate('/admin')
        }else if (userRole === 'seller') {
          window.location.href = '/products';
        }
      }
    } catch (err) {
      showAlert({
        message: "Credenciales incorrectas",
        severity: "error",
        title: "Error",
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h6">{isLogin?"Inicio de Sesión":"Registro"}</Typography>
        <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
        <TextField fullWidth label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
        {isLogin?
          <div>
            <Button onClick={handleLogin} variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
              Iniciar Sesión
            </Button>
            <Button onClick={() => setIsLogin(false)} color="secondary" >
              Registrarme
            </Button>
          </div>:
          <div>
            <TextField fullWidth label="Confirmar Contraseña" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} margin="normal" />
            <Button onClick={handleRegister} variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
              Registrarse
            </Button>
            <Button onClick={() => setIsLogin(true)} color="secondary" >
              Iniciar Sesión
            </Button>
          </div>
        }
        {//error && <Typography color="error">{error}</Typography>
        }
      </Box>
    </Modal>
  );
};

export default LoginModal;