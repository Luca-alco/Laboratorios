import { Link, useNavigate } from "react-router-dom";
import styles from "./listaCatalogo.module.css";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useState, useEffect } from 'react';

// Componente principal que muestra el catálogo de productos
function ListaCatalogo() {
  const navigate = useNavigate();
  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);
  // Estado para manejar errores de carga
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState(''); // Estado para la barra de búsqueda

  // Hook de efecto para cargar los productos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch productos
        const productsResponse = await fetch('http://localhost:8080/api/productos');
        const productsData = await productsResponse.json();
        const sortedProducts = productsData.sort((a, b) => 
          a.nombre.localeCompare(b.nombre)
        );
        setProducts(sortedProducts);
  
        // Fetch categorías desde el endpoint específico
        const categoriasResponse = await fetch('http://localhost:8080/api/categorias');
        const categoriasData = await categoriasResponse.json();
        setCategories(categoriasData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  // Función para manejar el clic en un producto
  const handleProductClick = (productId) => {
    navigate(`/productos/${productId}`);
  };

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Función para manejar el cambio en la barra de búsqueda
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Filtrar productos según la categoría seleccionada y el texto de búsqueda
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory 
    ? product.categorias?.some(cat => cat.id === parseInt(selectedCategory))
    : true;
  const matchesSearch = product.nombre.toLowerCase().includes(searchText.toLowerCase());
  return matchesCategory && matchesSearch;
});

  // Renderizado del componente
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
              {categories.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
          <hr className={styles.separador} />
          {filteredProducts.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product.id)}>
              <div className={styles.tarjetaProducto}>
                <div className={styles.imagen}> 
                  {product.imagen ? (
                    <img src={product.imagen} alt={product.name} />
                  ) : (
                    <p className={styles.texto}>Imagen no disponible</p>
                  )}
                </div>
                <div className={styles.descrpicion}>
                  <h4>{product.nombre}</h4>
                  <p className={styles.texto}>{product.descripcion || product.description}</p>
                  <p className={styles.texto}> Categorías: {product.categorias?.map(cat => cat.nombre).join(', ')}
                </p>
                <p className={styles.precio}>${product.precio}</p>
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