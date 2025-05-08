import React from "react";
import { Link } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar"; 
import "./myprofile.css";
import "./users.css";

const MyProfile = () => { 
  return (
    <div>
      <ResponsiveAppBar />
      
      <div className="perfil">
        <div className="infoPrincipal">
          <img 
            src="https://i.pinimg.com/280x280_RS/19/7a/3c/197a3cb00936a8b69e2aaff6bcfde1db.jpg" 
            alt="Foto de perfil" 
            className="fotoPerfil"
          />
          <div className="infoPerfil">
            <p>Nombre: Juan Perez</p>
            <p>Usuario: @juanperez03</p>
            <p>Email: juan.perez@abc.com</p>
            <p>Dirección: Calle Falsa 123</p>
          </div>
        </div>
        <div className="datosAdicionales">
          <p>Teléfono: 123456789</p> 
          <p>Fecha de nacimiento: 01/01/1990</p> 
          <p>Descripción: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> 
          <p>Intereses: Tecnología, Deportes, Música</p> 
          <p>Fecha de registro: 01/01/2022</p>
          <p>Último inicio de sesión: 01/01/2023</p>
          <p>Estado de la cuenta: Activa</p>
          <p>Tipo de cuenta: Usuario</p>
          <p>Preferencias de comunicación: Email</p>
          <p>Suscripciones: Newsletter, Promociones</p>
          <p>
            Historial de compras:    
            <ul>
              <li>Producto 1 - Fecha: 01/01/2022</li>
              <li>Producto 2 - Fecha: 01/02/2022</li>
              <li>Producto 3 - Fecha: 01/03/2022</li>
            </ul>       
          </p>
          <p>
            Redes sociales: 
            <ul>
              <li>Facebook: facebook.com/juanperez</li>
              <li>Twitter: twitter.com/juanperez</li>
              <li>Instagram: instagram.com/juanperez</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
