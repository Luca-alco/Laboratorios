// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import MyProfile from './pages/myProfile'; 
import Products from './pages/products'; 
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UsersLogin from './pages/usersLogin'; 
import Register from './pages/register';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>

    {/* <MyProfile /> */}
    {/* <Products /> */}
    {/* <UsersLogin /> */}
    <Register />


  </React.StrictMode>

);
