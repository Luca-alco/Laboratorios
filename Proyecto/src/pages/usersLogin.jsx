import React from "react";
import "./users.css";
import { TextField, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar"; 

function usersLogin() {
  return (
    <>
      <ResponsiveAppBar />

      {/* Título */}
      <div className="TituloLogin">
        <h2>Login de Usuario</h2>
      </div>

      {/* Formulario */}
      <Box
        sx={{
          maxWidth: 400,
          margin: "auto",
          marginTop: 4,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          marginBottom: 8, // Espacio adicional para separar del footer
        }}
      >
        <form>
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
            />
          </div>

          <Button
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

export default usersLogin;