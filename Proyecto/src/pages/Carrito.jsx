import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./carrito.css";
import "./users.css";


function Carrito() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

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

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  };

  const handleEmptyCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };
  //me permite seguir comprando sin perder los productos que ya tengo en el carrito
  const handleContinueShopping = () => {
    navigate('/productos');
  };

  return (
    <>
      <main>
      <div>
        <h2>Carrito de Compras</h2>
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="item-image">
                <img src={item.image} alt={item.name} />
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
        </div>

        <button onClick={handleEmptyCart} className="BotonVaciarCarro">
          Vaciar Carrito
        </button>
        <p>Total: ${calculateTotal().toFixed(2)}</p>
        <button onClick={handleContinueShopping}>Continuar Compra</button>
      </main>

    </>
  );
}

export default Carrito;
