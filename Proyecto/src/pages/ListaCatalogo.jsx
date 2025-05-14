import { Link, useNavigate } from "react-router-dom";
import styles from "./listaCatalogo.module.css";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useState, useEffect } from 'react';

function ListaCatalogo() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState(''); // Estado para la barra de búsqueda

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        // Ordenar productos alfabéticamente por nombre
        const sortedProducts = data.sort((a, b) => a.name.localeCompare(b.name));
        setProducts(sortedProducts);
        
        // Extraer categorías únicas
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories.sort());
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="homeScreen">
        <section className={styles.seccionPrincipal}>
          <h2 className={styles.tituloDiv}>Productos</h2>
          <div className={styles.filtroBusqueda}>
            {/* Barra de búsqueda */}
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchText}
              onChange={handleSearchChange}
              className={styles.inputBusqueda}
            />
            {/* Filtro por categoría */}
            <select 
              value={selectedCategory} 
              onChange={handleCategoryChange}
              className={styles.selectCategoria}
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <hr className={styles.separador} />
          {filteredProducts.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product.id)}>
              <div className={styles.tarjetaProducto}>
                <div className={styles.imagen}> 
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <p className={styles.texto}>Imagen no disponible</p>
                  )}
                </div>
                <div className={styles.descrpicion}>
                  <h4>{product.name}</h4>
                  <p className={styles.texto}>{product.description}</p>
                  <p className={styles.texto}>Categoría: {product.category}</p>
                  <p className={styles.texto}>${product.price}</p>
                </div>
                <div className={styles.comfirmar}>
                  <button className={styles.botonVer}>Ver</button>
                </div>
              </div>
              <hr className={styles.separador} />
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default ListaCatalogo;