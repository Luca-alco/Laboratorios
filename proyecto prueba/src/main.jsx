// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import MyProfile from './pages/myProfile'; // Asegúrate de que la ruta sea correcta
import Products from './pages/products'; // Asegúrate de que la ruta sea correcta
import Prueba from './pages/prueba'; // Asegúrate de que la ruta sea correcta
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>

    {/* <MyProfile /> */}
    <Products />


  </React.StrictMode>

);
