import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/homescreen";
import MyProfile from "./pages/myProfile";
import Products from "./pages/products";
import Gstprod2 from "./pages/gstprod2";
import PubliNueva from "./pages/PubliNueva";
import Carrito from "./pages/Carrito";
import UsersLogin from "./pages/usersLogin";
import Register from "./pages/register";
import ListaCatalogo from "./pages/ListaCatalogo";
import ResponsiveFooter from "./pages/responsivefooter"; // Importa el footer

function App() {
  return (
    <BrowserRouter>
      <div className="appContainer">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/perfil" element={<MyProfile />} />
          <Route path="/productos" element={<ListaCatalogo />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="/login" element={<UsersLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/gestion-productos" element={<Gstprod2 />} />
          <Route path="/nueva-publicacion" element={<PubliNueva />} />
        </Routes>
        <ResponsiveFooter /> 
      </div>
    </BrowserRouter>
  );
}

export default App;
