// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import MyProfile from './pages/myProfile'; 
import Products from './pages/products'; 
import Prueba from './pages/prueba'; // Asegúrate de que la ruta sea correcta
import HomeScreen from './pages/homescreen'; 
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PubliNueva from './pages/PubliNueva';
import './pages/index.css';
import Carrito from './pages/Carrito';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>


   
   <HomeScreen/>
   {/*<MyProfile/>*/}
   {/*<Products/>*/}



  </React.StrictMode>

);
