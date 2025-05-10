import React, { useState, useEffect } from "react";
import "./homescreen.css";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [featuredProducts, setFeaturedProducts] = useState([]); 
    const [allProducts, setAllProducts] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);

    // Definir descuentos fijos para cada producto destacado
    const PRODUCT_DISCOUNTS = {
        "1": 15,  // Remera Clásica Negra: 15% descuento
        "2": 25,  // Pantalón Jean Clásico: 25% descuento
        "3": 20,  // Campera de Cuero: 20% descuento
        "4": 30,  // Bermuda Cargo: 30% descuento
        "5": 10,  // Camisa Manga Larga: 10% descuento
        "6": 15   // Pantalón Deportivo: 15% descuento
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products');
                const data = await response.json();
                setAllProducts(data);
                
                // Aplicar descuentos fijos a los productos destacados
                const productsWithDiscounts = data.slice(0, 6).map(product => {
                    const discount = PRODUCT_DISCOUNTS[product.id];
                    const discountedPrice = product.price * (1 - discount/100);
                    return {
                        ...product,
                        originalPrice: product.price,
                        price: Number(discountedPrice.toFixed(2)),
                        discount
                    };
                });
                setFeaturedProducts(productsWithDiscounts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
    
        fetchProducts();
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    const handleSearch = () => {
        setShowSearchResults(true);
    };

    const filterProducts = (products, searchText) => {
        if (!searchText.trim()) {
            return [];
        }
        return products.filter(product => 
            product.name.toLowerCase().includes(searchText.toLowerCase()) ||
            product.description.toLowerCase().includes(searchText.toLowerCase()) ||
            product.category.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    const searchResults = filterProducts(allProducts, searchText);

    return (
        <div className="homeScreen">
            <div className="barra-busqueda">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="input-busqueda"
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        setShowSearchResults(false);
                    }}
                />
                <button className="btn-buscar" onClick={handleSearch}>Buscar</button>
            </div>

            {showSearchResults && searchText ? (
                <section className="productos-section">
                    <h2 className="productos-titulo">Resultados de búsqueda para "{searchText}"</h2>
                    <div className="productos-grid">
                        {searchResults.length > 0 ? (
                            searchResults.map((product) => (
                                <div key={product.id} className="producto-card">
                                    <div className="producto-imagen">
                                        <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
                                    </div>
                                    <div className="producto-info">
                                        <h3>{product.name}</h3>
                                        <p className="producto-precio">${product.price}</p>
                                        <button 
                                            className="btn-ver"
                                            onClick={() => handleProductClick(product.id)}
                                        >
                                            Ver
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron productos para "{searchText}"</p>
                        )}
                    </div>
                </section>
            ) : (
                <section className="productos-section">
                    <h2 className="productos-titulo">Productos Destacados</h2>
                    <div className="productos-grid">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="producto-card">
                                <div className="producto-imagen">
                                    <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
                                    {product.discount && (
                                        <div className="discount-badge">
                                            {product.discount}% OFF
                                        </div>
                                    )}
                                </div>
                                <div className="producto-info">
                                    <h3>{product.name}</h3>
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
            )}
        </div>
    );
};

export default HomeScreen;