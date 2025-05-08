import React, { useState, useEffect } from "react";
import "./homescreen.css";
import { useNavigate } from "react-router-dom";


const HomeScreen = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products');
                const data = await response.json();
                setProducts(data.slice(0, 6));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    return (
        <div className="homeScreen">

            <div className="barra-busqueda">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="input-busqueda"
                />
                <button className="btn-buscar">Buscar</button>
            </div>

            <section className="productos-section">
                <h2 className="productos-titulo">Productos Destacados</h2>
                <div className="productos-grid">
                    {products.map((product) => (
                        <div key={product.id} className="producto-card">
                            <div className="producto-imagen">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="producto-info">
                                <h3>{product.name}</h3>
                                <p className="producto-descripcion">{product.description}</p>
                                <p className="producto-precio">${product.price}</p>
                                <button 
                                    className="btn-ver"
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    Ver
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomeScreen;
