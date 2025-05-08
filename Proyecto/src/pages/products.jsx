import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./products.css";
import "./users.css";
import ResponsiveAppBar from "./ResponsiveAppBar"; 


function Products() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        const data = await response.json();
        console.log('Fetched product:', data); // Para debugging
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Cargando...</div>;
  // de la linea 28 a la 42 es para agregar el producto al carrito y navegar a la pagina del carrito
  const handleAddToCart = () => {
    // Obtener el carrito actual del localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
// Buscar si el producto ya existe en el carrito
const existingProductIndex = currentCart.findIndex(item => item.id === product.id);
  
let updatedCart;
if (existingProductIndex >= 0) {
  // Si el producto existe, incrementar su cantidad
  updatedCart = currentCart.map((item, index) => {
    if (index === existingProductIndex) {
      return {
        ...item,
        quantity: (item.quantity || 1) + 1
      };
    }
    return item;
  });
} else {
  // Si el producto no existe, agregarlo con cantidad 1
  const productToAdd = { ...product, quantity: 1 };
  updatedCart = [...currentCart, productToAdd];
}
    
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Navegar a la página del carrito
    navigate('/carrito');
  };

  return (
    <>
      
      <ResponsiveAppBar />

      <main>
        <div className="barra-busqueda">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="input-busqueda"
          />
          <button className="btn-buscar">Buscar</button>
        </div>

        <div className="fotoProducto">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="Descripcion">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Precio: ${product.price}</p>
        </div>

        <div className="AgregarCarrito">
          <input
            type="submit"
            value="Agregar al carrito"
            className="BotonAgregar"
            onClick={handleAddToCart}
          />
        </div>
      </main>

      
    </>
  );
}
export default Products;
