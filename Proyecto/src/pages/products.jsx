import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Products.css";

function Products() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Definir los mismos descuentos fijos que en HomeScreen
  const PRODUCT_DISCOUNTS = {
    "1": 15,  // Remera Clásica Negra: 15% descuento
    "2": 25,  // Pantalón Jean Clásico: 25% descuento
    "3": 20,  // Campera de Cuero: 20% descuento
    "4": 30,  // Bermuda Cargo: 30% descuento
    "5": 10,  // Camisa Manga Larga: 10% descuento
    "6": 15   // Pantalón Deportivo: 15% descuento
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        const productData = await response.json();

        // Aplicar descuento si es un producto destacado
        if (PRODUCT_DISCOUNTS.hasOwnProperty(productData.id)) {
          const discount = PRODUCT_DISCOUNTS[productData.id];
          const discountedPrice = productData.price * (1 - discount/100);
          setProduct({
            ...productData,
            originalPrice: productData.price,
            price: Number(discountedPrice.toFixed(2)),
            discount
          });
        } else {
          setProduct(productData);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = currentCart.findIndex(item => item.id === product.id);
    
    let updatedCart;
    if (existingProductIndex >= 0) {
      updatedCart = currentCart.map((item, index) => {
        if (index === existingProductIndex) {
          return {
            ...item,
            quantity: (item.quantity || 1) + selectedQuantity
          };
        }
        return item;
      });
    } else {
      const productToAdd = { ...product, quantity: selectedQuantity };
      updatedCart = [...currentCart, productToAdd];
    }
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/carrito');
  };

  const handleBuyNow = () => {
    const productToAdd = { ...product, quantity: selectedQuantity };
    const cart = [productToAdd];
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/carrito?showPayment=true');
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="product-page">
      <div className="product-layout">
        <div className="product-left">
          <div className="product-gallery">
            <img src={product.image} alt={product.name} className="main-image" />
            {product.discount && (
              <div className="discount-badge">
                {product.discount}% OFF
              </div>
            )}
          </div>
          
          <div className="product-description">
            <h2>Descripción</h2>
            <p>{product.description}</p>
          </div>

          <div className="product-characteristics">
            <h2>Características del producto</h2>
            <div className="characteristics-grid">
              <div className="characteristics-main">
                <h3>Características principales</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>Marca</td>
                      <td>{product.brand}</td>
                    </tr>
                    <tr>
                      <td>Línea</td>
                      <td>{product.line}</td>
                    </tr>
                    <tr>
                      <td>Modelo</td>
                      <td>{product.model}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="product-right">
          <div className="product-info-card">
            <div className="product-condition">Nuevo | +10mil vendidos</div>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating">
              <span className="stars">★★★★½</span>
              <span className="rating-count">(2225)</span>
            </div>

            <div className="product-price-container">
              {product.originalPrice && (
                <div className="original-price-row">
                  <span className="original-price">${product.originalPrice.toLocaleString()}</span>
                  <span className="discount-tag">{product.discount}% OFF</span>
                </div>
              )}
              <div className="price-row">
                <span className="current-price">${product.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="payment-info">
              <p>en 6 cuotas de ${(product.price / 6).toFixed(2)}</p>
              <a href="#" className="payment-link">Ver los medios de pago</a>
            </div>

            <div className="delivery-info">
              <div className="free-shipping">
                <span className="shipping-icon">📦</span>
                <div>
                  <p className="delivery-text">Llega gratis mañana</p>
                  <a href="#" className="shipping-link">Más formas de entrega</a>
                </div>
              </div>
            </div>

            <div className="stock-selection">
              <div className="stock-label">
                <span>Cantidad:</span>
                <select 
                  value={selectedQuantity} 
                  onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                >
                  {[...Array(Math.min(10, product.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} unidad{i > 0 ? 'es' : ''}
                    </option>
                  ))}
                </select>
                <span className="stock-available">({product.stock} disponibles)</span>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="buy-now-button"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Sin stock' : 'Comprar ahora'}
              </button>
              <button 
                className="add-to-cart-button" 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
