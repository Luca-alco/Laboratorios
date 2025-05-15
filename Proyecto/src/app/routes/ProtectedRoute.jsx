// Importación de dependencias necesarias
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Componente de ruta protegida
// Este componente envuelve rutas que requieren autenticación
// Si el usuario no está autenticado, lo redirige al login
const ProtectedRoute = ({ children }) => {
  // Obtiene el estado de autenticación del contexto
  const { isAuthenticated } = useAuth();
  
  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderiza los componentes hijos
  return children;
};

export default ProtectedRoute;