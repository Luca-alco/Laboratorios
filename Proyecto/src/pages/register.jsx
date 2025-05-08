import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './users.css';
import { TextField, Button, Box } from '@mui/material';
import ResponsiveAppBar from "./ResponsiveAppBar"; 

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        usuario: '',
        password: '',
        telefono: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.email.includes('@')) {
            alert('Por favor ingrese un email válido');
            return;
        }
        
        if (formData.password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            const emailCheckResponse = await fetch(`http://localhost:3000/users?email=${formData.email}`);
            const existingUsers = await emailCheckResponse.json();
            
            if (existingUsers.length > 0) {
                alert('Ya existe un usuario registrado con este email');
                return;
            }

            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    id: Date.now() 
                })
            });

            if (response.ok) {
                alert('Usuario registrado exitosamente');
                navigate('/login');
            } else {
                const error = await response.text();
                alert('Error al registrar: ' + error);
            }
        } catch (error) {
            console.error('Error al registrar:', error);
            alert('Error al registrar usuario');
        }
    };

    return (
        <>
            <ResponsiveAppBar />
            <div className="TituloRegister">
                <h2>Registro de Usuario</h2>
            </div>

            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                Complete los datos solicitados
            </p>

            <Box
                sx={{
                    maxWidth: 400,
                    margin: 'auto',
                    marginTop: 4,
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    display: 'flex',
                }}  
            >
                <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '1rem', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <label htmlFor="nombre" style={{ marginRight: '1rem', width: '100px' }}>Nombre:</label>
                        <TextField 
                            id="nombre" 
                            variant="outlined" 
                            fullWidth 
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <label htmlFor="apellido" style={{ marginRight: '1rem', width: '100px' }}>Apellido:</label>
                        <TextField 
                            id="apellido" 
                            variant="outlined" 
                            fullWidth 
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <label htmlFor="email" style={{ marginRight: '1rem', width: '100px' }}>Email:</label>
                        <TextField 
                            id="email" 
                            type="email" 
                            variant="outlined" 
                            fullWidth 
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <label htmlFor="telefono" style={{ marginRight: '1rem', width: '100px' }}>Teléfono:</label>
                        <TextField 
                            id="telefono" 
                            variant="outlined" 
                            fullWidth 
                            value={formData.telefono}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <label htmlFor="usuario" style={{ marginRight: '1rem', width: '100px' }}>Usuario:</label>
                        <TextField 
                            id="usuario" 
                            variant="outlined" 
                            fullWidth 
                            value={formData.usuario}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <label htmlFor="password" style={{ marginRight: '1rem', width: '100px' }}>Contraseña:</label>
                        <TextField 
                            id="password" 
                            type="password" 
                            variant="outlined" 
                            fullWidth 
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Button 
                        type="submit" 
                        variant="outlined" 
                        fullWidth 
                        sx={{ 
                            mt: 2, 
                            color: 'black', 
                            borderColor: 'black', 
                            backgroundColor: 'white'
                        }}
                    >
                        Confirmar
                    </Button>
                </form>
            </Box>
        </>
    );
}

export default Register;