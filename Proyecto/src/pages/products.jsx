// Importación de dependencias necesarias
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Products.css";
import { useAuth } from "../context/AuthContext";

// Componente principal de detalle de producto
const Products = () => {
    // Hooks para navegación y parámetros
    const { id } = useParams();
    const navigate = useNavigate();
    // Hook de autenticación para verificar usuario actual
    const { currentUser } = useAuth();

    // Estados del componente
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // Hook de efecto para cargar los datos del producto
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/products/${id}`);
                if (!response.ok) {
                    throw new Error('Producto no encontrado');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError('Error al cargar el producto');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Función para manejar cambios en la cantidad
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0 && value <= product.stock) {
            setQuantity(value);
            setError("");
        } else {
            setError(`La cantidad debe estar entre 1 y ${product.stock}`);
        }
    };

    // Función para agregar producto al carrito
    const handleAddToCart = () => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

        if (existingItemIndex >= 0) {
            // Actualiza la cantidad si el producto ya está en el carrito
            const newQuantity = cartItems[existingItemIndex].quantity + quantity;
            if (newQuantity > product.stock) {
                setError(`No hay suficiente stock. Stock disponible: ${product.stock}`);
                return;
            }
            cartItems[existingItemIndex].quantity = newQuantity;
        } else {
            // Agrega nuevo item al carrito
            cartItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                imagen: product.imagen,
                quantity: quantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
        navigate('/cart');
    };

    // Función para comprar ahora
    const handleBuyNow = () => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        // Guarda el producto actual como único item en el carrito
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            imagen: product.imagen,
            quantity: quantity
        };

        localStorage.setItem('cart', JSON.stringify([cartItem]));
        navigate('/cart?showPayment=true');
    };

    // Renderizado condicional según el estado de carga
    if (loading) {
        return <div className="loading">Cargando...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!product) {
        return <div className="error">Producto no encontrado</div>;
    }

    // Renderizado principal del componente
    return (
        <div className="product-detail-container">
            {/* Sección de imagen del producto */}
            <div className="product-image-section">
                <img 
                    src={product.imagen || 'https://via.placeholder.com/400'} 
                    alt={product.name}
                    className="product-detail-image" 
                />
            </div>

            {/* Sección de información del producto */}
            <div className="product-info-section">
                <h1>{product.name}</h1>
                <p className="product-price">${product.price}</p>
                <p className="product-description">{product.description}</p>
                
                <div className="stock-info">
                    <p>Stock disponible: {product.stock}</p>
                </div>

                {/* Control de cantidad */}
                <div className="quantity-control">
                    <label htmlFor="quantity">Cantidad:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        max={product.stock}
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>

                {/* Botones de acción */}
                <div className="action-buttons">
                    <button 
                        onClick={handleAddToCart}
                        className="add-to-cart-button"
                        disabled={!product.stock}
                    >
                        Agregar al Carrito
                    </button>
                    <button 
                        onClick={handleBuyNow}
                        className="buy-now-button"
                        disabled={!product.stock}
                    >
                        Comprar Ahora
                    </button>
                </div>

                {/* Información adicional del producto */}
                <div className="additional-info">
                    {product.category && (
                        <p><strong>Categoría:</strong> {product.category}</p>
                    )}
                    {product.brand && (
                        <p><strong>Marca:</strong> {product.brand}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;