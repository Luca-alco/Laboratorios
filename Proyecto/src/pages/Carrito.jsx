import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./carrito.css";
import "./users.css";

function Carrito() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const handleRemoveItem = (index) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = cartItems.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: parseInt(newQuantity) || 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  };

  const calculateIVA = (subtotal) => {
    return subtotal * 0.21; // 21% IVA
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const iva = calculateIVA(subtotal);
    return subtotal + iva;
  };

  const handleEmptyCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const handleContinueShopping = () => {
    navigate('/productos');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleStartShopping = () => {
    navigate('/');
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h1>EL CARRITO ESTÁ VACÍO</h1>
          <p>Una vez que añadas algo a tu carrito, aparecerá acá. ¿Listo para comprar?</p>
          <button onClick={handleStartShopping} className="start-shopping-button">
            EMPEZAR <span className="arrow">→</span>
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items-section">
            <h2>Carrito de Compras</h2>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-image">
                  <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Precio: ${item.price}</p>
                  <div className="quantity-control">
                    <label>Cantidad: </label>
                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity || 1} 
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(index)}
                    className="remove-button"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            
            <div className="cart-actions">
              <button onClick={handleEmptyCart} className="empty-cart-button">
                Vaciar Carrito
              </button>
              <button onClick={handleContinueShopping} className="continue-shopping-button">
                Continuar Comprando
              </button>
            </div>
          </div>

          <div className="order-summary">
            <h2>RESUMEN DEL PEDIDO</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>{cartItems.length} productos</span>
                <span>$ {calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Entrega</span>
                <span>Gratis</span>
              </div>
              <div className="price-details">
                <div className="summary-row subtotal">
                  <span>Precio sin impuestos</span>
                  <span>$ {calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="summary-row iva">
                  <span>(IVA incluido</span>
                  <span>$ {calculateIVA(calculateSubtotal()).toFixed(2)})</span>
                </div>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>$ {calculateTotal().toFixed(2)}</span>
              </div>
              
              <div className="promo-code">
                <button className="promo-code-button">
                  USÁ UN CÓDIGO PROMOCIONAL
                </button>
              </div>

              <button onClick={handleCheckout} className="checkout-button">
                IR A PAGAR
              </button>

              <div className="payment-options">
                <p>OPCIONES DE PAGO</p>
                <div className="payment-icons">
                  <img src="https://www.mastercard.com/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg" alt="Mastercard" className="payment-icon" />
                  <img src="https://usa.visa.com/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg" alt="Visa" className="payment-icon" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;
