// Importación de dependencias necesarias de React
import React, { createContext, useState, useContext, useEffect } from 'react';

// Creación del contexto de autenticación
const AuthContext = createContext(null);

// Proveedor del contexto de autenticación
// Este componente maneja el estado global de autenticación y provee métodos para login/logout
export const AuthProvider = ({ children }) => {
  // Estados para manejar la autenticación y datos del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Efecto para recuperar la sesión del usuario al cargar la aplicación
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
  }, []);

  // Función para iniciar sesión
  const login = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  // Función para cerrar sesión
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  // Proveedor que expone el estado y funciones de autenticación a toda la aplicación
  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);