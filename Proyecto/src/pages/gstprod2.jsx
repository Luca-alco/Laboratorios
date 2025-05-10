import React, { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import "./gstprod2.css";
import "./users.css";

const Gstprod2 = () => {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Get all products from the backend
        const response = await fetch('http://localhost:3000/products');
        const allProducts = await response.json();
        
        // Get recently created product from localStorage
        const newProductData = localStorage.getItem('productData');
        if (newProductData) {
          const parsedProduct = JSON.parse(newProductData);
          
          // Create a new product in the backend
          const createResponse = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...parsedProduct,
              id: Date.now().toString(),
              userId: currentUser.id,
              price: 0,
              brand: parsedProduct.marca,
              name: `${parsedProduct.marca} ${parsedProduct.categoria}`,
              category: parsedProduct.categoria
            })
          });

          if (createResponse.ok) {
            // Clear localStorage after successful creation
            localStorage.removeItem('productData');
          }
        }

        // Reload products to get updated list including the new one
        const updatedResponse = await fetch('http://localhost:3000/products');
        const updatedProducts = await updatedResponse.json();
        
        // Filter products by current user
        const userProducts = updatedProducts.filter(product => product.userId === currentUser.id);
        setProducts(userProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [currentUser?.id]);

  const updateStock = async (productId, newStock) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stock: newStock
        })
      });

      if (response.ok) {
        setProducts(products.map(product => 
          product.id === productId ? { ...product, stock: newStock } : product
        ));
      }
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  if (loading) {
    return <div>Cargando publicaciones...</div>;
  }

  if (products.length === 0) {
    return <div>No tienes publicaciones aún. ¡Crea una nueva!</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-left">
            <div className="product-gallery">
              {product.imagen && (
                <img
                  src={product.imagen}
                  alt="Imagen del producto"
                  className="main-image"
                />
              )}
            </div>
            
            <div className="product-description">
              <h2>Descripción</h2>
              <p>{product.descripcion}</p>
            </div>

            <div className="product-characteristics">
              <h2>Características del producto</h2>
              <div className="characteristics-grid">
                <div className="characteristics-main">
                  <table>
                    <tbody>
                      <tr>
                        <td>Marca</td>
                        <td>{product.marca}</td>
                      </tr>
                      <tr>
                        <td>Categoría</td>
                        <td>{product.categoria}</td>
                      </tr>
                      <tr>
                        <td>Talle</td>
                        <td>{product.talle}</td>
                      </tr>
                      <tr>
                        <td>Estado</td>
                        <td>{product.estado}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="product-right">
            <div className="product-info-card">
              <div className="product-condition">Gestión de Stock</div>
              <h1 className="product-title">{product.name}</h1>
              
              <div className="stock-info-section">
                <h3>Stock Actual: {product.stock} unidades</h3>
                
                <div className="stock-actions">
                  <button
                    onClick={() => updateStock(product.id, Number(product.stock) + 1)}
                    className="add-stock-button"
                  >
                    Aumentar Stock (+1)
                  </button>
                  <button
                    onClick={() => updateStock(product.id, Math.max(0, Number(product.stock) - 1))}
                    className="remove-stock-button"
                    disabled={product.stock <= 0}
                  >
                    Disminuir Stock (-1)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gstprod2;