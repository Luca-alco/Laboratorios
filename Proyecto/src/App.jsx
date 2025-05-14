import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomeScreen from "./pages/Homescreen";
import MyProfile from "./pages/MyProfile";
import Products from "./pages/Products";
import Gstprod2 from "./pages/Gstprod2";
import PubliNueva from "./pages/PubliNueva";
import Carrito from "./pages/Carrito";
import UsersLogin from "./pages/UsersLogin";
import Register from "./pages/Register";
import ListaCatalogo from "./pages/ListaCatalogo";
import ResponsiveFooter from "./pages/ResponsiveFooter"; 
import ResponsiveAppBar from "./pages/ResponsiveAppBar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="appContainer">
          <ResponsiveAppBar />
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
    </AuthProvider>
  );
}

export default App;
