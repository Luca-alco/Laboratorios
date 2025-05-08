import React, { useState } from "react";
import "./users.css";
import { TextField, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar"; 

function UsersLogin() {
  const navigate = useNavigate();
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
        localStorage.setItem('currentUser', JSON.stringify(user));
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
    <>
  

      <Box
        sx={{
          maxWidth: 400,
          margin: "auto",
          marginTop: 4,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          marginBottom: 8,
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Email:
            </label>
            <TextField
              id="email"
              variant="outlined"
              fullWidth
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Contraseña:
            </label>
            <TextField
              id="password"
              variant="outlined"
              fullWidth
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              color: "black",
              borderColor: "black",
              backgroundColor: "white",
            }}
          >
            Confirmar
          </Button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <p>¿No tiene un usuario creado?</p>
          <Link to="/register">
            <Button
              variant="outlined"
              sx={{
                color: "black",
                borderColor: "black",
                backgroundColor: "white",
              }}
            >
              Registrese Aqui
            </Button>
          </Link>
        </div>
      </Box>
    </>
  );
}

export default UsersLogin;