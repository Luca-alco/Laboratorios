import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./carrito.css";
import { useAuth } from '../context/AuthContext';

// Componente principal del carrito de compras
function Carrito() {
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const { currentUser } = useAuth(); 
  // Estado para almacenar los items del carrito
  const [cartItems, setCartItems] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardType: 'visa',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    dni: '',
    nombre: currentUser?.nombre || '',
    apellido: currentUser?.apellido || '',
    telefono: currentUser?.telefono || ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Hook de efecto para cargar los items del carrito al montar el componente
  useEffect(() => {
    const loadCartItems = async () => {
      // Obtiene los items del carrito desde el localStorage
      const items = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Verificar stock actual para cada item
      try {
        const itemsWithStock = await Promise.all(items.map(async (item) => {
          const response = await fetch(`http://localhost:8080/api/productos/${item.id}`);
          const product = await response.json();
          return {
            ...item,
            currentStock: product.stock,
            stockError: product.stock < item.quantity
          };
        }));
        setCartItems(itemsWithStock);
        
        // Mostrar formulario de pago si viene desde "Comprar ahora"
        const params = new URLSearchParams(location.search);
        if (params.get('showPayment') === 'true') {
          setShowPaymentForm(true);
        }
      } catch (error) {
        console.error('Error verificando stock:', error);
      }
    };

    loadCartItems();
  }, [location.search]);

  // Función para eliminar un producto del carrito
  const handleRemoveItem = (index) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  // Función para actualizar la cantidad de un producto
  const handleQuantityChange = async (index, newQuantity) => {
    try {
      const item = cartItems[index];
      const response = await fetch(`http://localhost:8080/api/productos/${item.id}`);
      const product = await response.json();

      // Convertir newQuantity a número
      const quantity = parseInt(newQuantity) || 1;

      if (quantity > product.stock) {
        const updatedItems = cartItems.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              quantity: product.stock, // Ajustar a máximo stock disponible
              currentStock: product.stock,
              stockError: true
            };
          }
          return item;
        });
        setCartItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        setError(`Solo hay ${product.stock} unidades disponibles de ${item.nombre || item.name}`);
        return;
      }


      const updatedItems = cartItems.map((item, i) => {
        if (i === index) {
          return { 
            ...item, 
            quantity: quantity,
            currentStock: product.stock, // Actualizar el stock actual
            stockError: quantity > product.stock
          };
        }
        return item;
      });
      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      setError('');
    } catch (error) {
      console.error('Error actualizando cantidad:', error);
    }
  };

  // Función para calcular el subtotal del carrito
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.precio || item.price || 0);
      const quantity = parseInt(item.quantity || 1);
      return total + (itemPrice * quantity);
    }, 0);
  };

  // Función para calcular el IVA del carrito
  const calculateIVA = (subtotal) => {
    return subtotal * 0.21;
  };

  // Función para calcular el total del carrito
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const iva = calculateIVA(subtotal);
    return subtotal + iva;
  };

  // Función para procesar el pago
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validar stock una última vez antes de procesar el pago
    try {
      const stockValidation = await Promise.all(cartItems.map(async (item) => {
        const response = await fetch(`http://localhost:8080/api/productos/${item.id}`);
        const product = await response.json();
        return {
          item,
          hasStock: product.stock >= item.quantity
        };
      }));

      const invalidItems = stockValidation.filter(({item, hasStock}) => !hasStock);
      if (invalidItems.length > 0) {
        setError(`No hay suficiente stock para: ${invalidItems.map(({item}) => item.name).join(', ')}`);
        setLoading(false);
        return;
      }

      // Validar datos de la tarjeta
      if (paymentData.cardNumber.length !== 16) {
        setError('El número de tarjeta debe tener 16 dígitos');
        setLoading(false);
        return;
      }

      if (paymentData.cvv.length !== 3) {
        setError('El CVV debe tener 3 dígitos');
        setLoading(false);
        return;
      }

      if (!paymentData.dni || !paymentData.nombre || !paymentData.apellido) {
        setError('Todos los campos son obligatorios');
        setLoading(false);
        return;
      }

      // Actualizar stock de productos
      await Promise.all(cartItems.map(async (item) => {
        const response = await fetch(`http://localhost:8080/api/productos/${item.id}`);
        const product = await response.json();
        
        await fetch(`http://localhost:8080/api/productos/${item.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stock: product.stock - item.quantity
          })
        });
      }));

      // Simular procesamiento del pago
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Limpiar carrito y mostrar éxito
      localStorage.removeItem('cart');
      setCartItems([]);
      alert('¡Compra realizada con éxito!');
      navigate('/');

    } catch (error) {
      console.error('Error procesando el pago:', error);
      setError('Error procesando el pago. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar cambios en los inputs del formulario de pago
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para iniciar la compra
  const handleStartShopping = () => {
    navigate('/');
  };

  const hasStockErrors = cartItems.some(item => item.stockError);

  // Renderizado del componente
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
      ) : !showPaymentForm ? (
        <>
          <div className="cart-items-section">
            <h2>Carrito de Compras</h2>
            {error && <div className="error-message">{error}</div>}
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-image">
                  <img src={item.imagen || 'https://via.placeholder.com/150'} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Precio: ${item.price}</p>
                  <div className="quantity-control">
                    <label>Cantidad: </label>
                    <input 
                      type="number" 
                      min="1" 
                      max={item.currentStock}
                      value={item.quantity || 1} 
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                    <span className="stock-info">
                      (Disponibles: {item.currentStock})
                    </span>
                  </div>
                  {item.stockError && (
                    <p className="stock-error">
                      ¡Stock insuficiente! Solo hay {item.currentStock} unidades disponibles
                    </p>
                  )}
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

          <div className="order-summary">
            <h2>RESUMEN DEL PEDIDO</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>{cartItems.length} productos</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>

              <button 
                onClick={() => setShowPaymentForm(true)} 
                className="checkout-button"
                disabled={hasStockErrors}
              >
                {hasStockErrors ? 'REVISE EL STOCK ANTES DE CONTINUAR' : 'CONTINUAR AL PAGO'}
              </button>

              <div className="payment-options">
                <p>MEDIOS DE PAGO ACEPTADOS</p>
                <div className="payment-icons">
                  <img src="https://www.mastercard.com/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg" alt="Mastercard" className="payment-icon" />
                  <img src="https://usa.visa.com/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg" alt="Visa" className="payment-icon" />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="payment-form-container">
          <h2>Datos de Pago</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handlePaymentSubmit} className="payment-form">
            <div className="form-group">
              <label>Tipo de Tarjeta</label>
              <select 
                name="cardType"
                value={paymentData.cardType}
                onChange={handleInputChange}
                required
              >
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
              </select>
            </div>

            <div className="form-group">
              <label>Número de Tarjeta</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleInputChange}
                pattern="[0-9]{16}"
                placeholder="1234567890123456"
                required
                maxLength="16"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Fecha de Vencimiento</label>
                <input
                  type="month"
                  name="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                  pattern="[0-9]{3}"
                  placeholder="123"
                  required
                  maxLength="3"
                />
              </div>
            </div>

            <div className="form-group">
              <label>DNI</label>
              <input
                type="text"
                name="dni"
                value={paymentData.dni}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={paymentData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={paymentData.apellido}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={paymentData.telefono}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="payment-summary">
              <h3>Total a Pagar: ${calculateTotal().toFixed(2)}</h3>
            </div>

            <div className="payment-actions">
              <button 
                type="button" 
                onClick={() => setShowPaymentForm(false)}
                className="back-button"
              >
                Volver al Carrito
              </button>
              <button 
                type="submit" 
                className="confirm-payment-button"
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Confirmar Pago'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Carrito;
