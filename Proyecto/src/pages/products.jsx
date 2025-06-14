import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./products.css";
function Products() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
  
    const PRODUCT_DISCOUNTS = {
      "1": 15,
      "2": 25,
      "3": 20,
      "4": 30,
      "5": 10,
      "6": 15
    };
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/productos/${id}`);
          const productData = await response.json();
  
       // Normalizar el precio primero
          const normalizedPrice = productData.precio || productData.price || 0;

          if (PRODUCT_DISCOUNTS.hasOwnProperty(productData.id)) {
            const discount = PRODUCT_DISCOUNTS[productData.id];
            const discountedPrice = normalizedPrice * (1 - discount / 100);
            setProduct({
              ...productData,
              originalPrice: normalizedPrice,
              price: Number(discountedPrice.toFixed(2)),
              discount
            });
       } else {
         setProduct({
           ...productData,
           price: normalizedPrice // Asegurar que siempre haya un precio
         });
       }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
  
      fetchProduct();
    }, [id]);
    const handleAddToCart = () => {
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = currentCart.findIndex(
          (item) => item.id === product.id
        );

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

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/carrito");
  };

  const handleBuyNow = () => {
    const productToAdd = { ...product, quantity: selectedQuantity };
    const cart = [productToAdd];
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/carrito?showPayment=true");
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="product-page">
      <div className="product-layout">
        <div className="product-left">
          <div className="product-gallery">
            <img
              src={product.imagen}
              alt={product.name}
              className="main-image"
            />
            {product.discount && (
              <div className="discount-badge">{product.discount}% OFF</div>
            )}
            {product.imagenes && product.imagenes.length > 1 && (
              <div className="thumbnail-images">
                {product.imagenes.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} vista ${index + 1}`}
                    className="thumbnail-image"
                    onClick={() => {
                      setProduct({ ...product, imagen: img });
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-description">
            <h2>Descripción</h2>
            <p>{product.descripcion || product.description}</p>
          </div>
        </div>
        <div className="product-right">
          <div className="product-info-card">
            <div className="product-condition">Nuevo | +10mil vendidos</div>
            <h1 className="product-title">{product.nombre || product.name}</h1>
            <div className="product-price-container">
              {product.originalPrice && (
                <div className="original-price-row">
                  <span className="original-price">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="discount-tag">
                    {product.discount}% OFF
                  </span>
                </div>
              )}
              <div className="price-row">
                <span className="current-price">
                  ${(product.price).toLocaleString()}
                </span>
              </div>
              <div className="installments-info">
                en 6 cuotas de ${(product.price | 0 / 6).toFixed(2)}
              </div>
              <div className="shipping-info">
                <span className="shipping-icon">📦</span>
                <span className="free-shipping-text">Llega gratis mañana</span>
              </div>
            </div>
            <div className="stock-selection">
              <span>Cantidad:</span>
              <select
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
              >
                {[...Array(Math.min(10, product.stock))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} unidad{i > 0 ? "es" : ""}
                  </option>
                ))}
              </select>
              <span className="stock-available">
                ({product.stock} disponibles)
              </span>
               </div>

            <div className="action-buttons">
              <button
                className="buy-now-button"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Sin stock" : "Comprar ahora"}
              </button>
              <button
                className="add-to-cart-button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
              </button> </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Products;
