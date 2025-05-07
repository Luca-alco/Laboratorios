import React from 'react';
import { Link } from 'react-router-dom';
import './users.css';
import { TextField, Button, Box } from '@mui/material';

function register(){
   return (
    <>
    {/* Header */}
    <header className="HeaderLogin">
        <h1>Nombre Web</h1>
      </header>

      {/* Home Button */}
      <div>
        <Link to="/" className="home-button">
          🏠 Inicio
        </Link>
      </div>

      {/* Título */}
      <div className="TituloRegister">
        <h2>Registro de Usuario</h2>
      </div>

      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Complete los datos solicitados
      </p>

        {/* Formulario */}
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

        <form style={{ maxWidth: '500px', margin: '0 auto', padding: '1rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <label htmlFor="nombre" style={{ marginRight: '1rem', width: '100px' }}>Nombre:</label>
                <TextField id="nombre" variant="outlined" fullWidth />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <label htmlFor="apellido" style={{ marginRight: '1rem', width: '100px' }}>Apellido:</label>
                <TextField id="apellido" variant="outlined" fullWidth  />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <label htmlFor="email" style={{ marginRight: '1rem', width: '100px' }}>Email:</label>
                <TextField id="email" type="email" variant="outlined" fullWidth />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <label htmlFor="usuario" style={{ marginRight: '1rem', width: '100px' }}>Usuario:</label>
                <TextField id="usuario" variant="outlined" fullWidth />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <label htmlFor="password" style={{ marginRight: '1rem', width: '100px' }}>Contraseña:</label>
                <TextField id="password" type="password" variant="outlined" fullWidth  />
            </div>

            <Button variant="outlined" fullWidth sx={{ mt: 2 , color: 'black', borderColor: 'black', backgroundColor: 'white'
                    }}>
                Confirmar
            </Button>
            </form>
        </Box>

        {/* Footer */}
      <footer>
        <div className="TxtFooter">
          <h1>INFO WEB</h1>
        </div>
      </footer>
    </>
  );
}

export default register;