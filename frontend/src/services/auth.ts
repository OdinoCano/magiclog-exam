import api from "./api";

export const validateToken = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    // Llamar a endpoint de validación
    await api.post('/auth/validate');
    return true;
  } catch (error) {
    logout();
    return false;
  }
};
  
export const logout = () => {
  localStorage.removeItem('token');
  // Limpiar estado global (ej: Redux, Context)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('storage')); // Sincronizar pestañas
  }
};