// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import MyProfile from './pages/myProfile'; 
import Products from './pages/products'; 
import { createRoot } from "react-dom/client";
import PubliNueva from './pages/PubliNueva';
import './pages/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>

    {/* <MyProfile /> */}
    {/* <Products /> */}
    <PubliNueva />


  </React.StrictMode>

);
