import React from "react";

const  MyProfile = () => { 
  return (
    <div className="myProfile">
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
      <p>Nombre: Juan Perez</p>
      <p>Email: juan.perez@abc.com</p>
      <p>Teléfono: 123456789</p>    
        <p>Dirección: Calle Falsa 123</p>
        <p>Fecha de nacimiento: 01/01/1990</p>
        <p>Descripción: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> 
        <p>Intereses: Tecnología, Deportes, Música</p>
        <p>Redes sociales: 
          <ul>
            <li>Facebook: facebook.com/juanperez</li>
            <li>Twitter: twitter.com/juanperez</li>
            <li>Instagram: instagram.com/juanperez</li>
          </ul>
        </p>            
        <p>Foto de perfil: 
          <img src="https://via.placeholder.com/150" alt="Foto de perfil" />
        </p>                        
        <p>Fecha de registro: 01/01/2022</p>
        <p>Último inicio de sesión: 01/01/2023</p>                  
        <p>Estado de la cuenta: Activa</p>
        <p>Tipo de cuenta: Usuario</p>  

        <p>Preferencias de comunicación: Email</p>          
        <p>Suscripciones: Newsletter, Promociones</p>   

        <p>Historial de compras:    
            <ul>
                <li>Producto 1 - Fecha: 01/01/2022</li>
                <li>Producto 2 - Fecha: 01/02/2022</li>
                <li>Producto 3 - Fecha: 01/03/2022</li>
            </ul>       
        </p>                    
        <p>Comentarios: 
            <ul>
                <li>Comentario 1 - Fecha: 01/01/2022</li>
                <li>Comentario 2 - Fecha: 01/02/2022</li>
                <li>Comentario 3 - Fecha: 01/03/2022</li>
            </ul>
        </p>
        </div>
    )
 };
    export default MyProfile;