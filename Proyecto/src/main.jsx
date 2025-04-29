// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import MyProfile from "./pages/myProfile";
import Products from "./pages/products";
import Gstprod2 from "./pages/gstprod2";
import HomeScreen from "./pages/homescreen";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PubliNueva from "./pages/PubliNueva";
import "./pages/index.css";
import Carrito from "./pages/Carrito";
import UsersLogin from "./pages/usersLogin";
import Register from "./pages/register";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* <Carrito /> */}
    {/* <PubliNueva /> */}
    {/* <HomeScreen /> */}
    {/* <MyProfile /> */}
    {/* <Products /> */}
    {/* <UsersLogin /> */}
    <Register />
    {/*<Gstprod2/>*/}
  </React.StrictMode>
);
