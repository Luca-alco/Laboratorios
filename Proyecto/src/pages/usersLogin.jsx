import React, { useState } from "react";
import "./Users.css";
import { TextField, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function UsersLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      
      const user = users.find(u => 
        u.email === formData.email && 
        u.password === formData.password
      );

      if (user) {
        login(user); // Usar la función login del contexto
        navigate('/');
      } else {
        setError('Email o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Error al intentar iniciar sesión');
    }
  };

  return (
    <Box
    className="login-container"
  >
  <form className="login-form" onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="email" className="login-label">E-mail o teléfono</label>
      <input
        type="email"
        id="email"
        className="login-input"
        placeholder="Ingresa tu e-mail o teléfono"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="password" className="login-label">Contraseña</label>
      <input
        type="password"
        id="password"
        className="login-input"
        placeholder="Ingresa tu contraseña"
        value={formData.password}
        onChange={handleChange}
        required
      />
    </div>

    {error && (
      <div className="error-message">
        {error}
      </div>
    )}

    <button type="submit" className="login-button">Continuar</button>
  </form>

  <div className="register-link">
    <p>¿No tiene un usuario creado?</p>
    <Link to="/register">Crear cuenta</Link>
  </div>
</Box>
  );
}

export default UsersLogin;