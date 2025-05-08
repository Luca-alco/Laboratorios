import { Link, useNavigate } from "react-router-dom";
import styles from "./listaCatalogo.module.css";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useState, useEffect } from 'react';

function ListaCatalogo() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Producto 1",
      description: "Descripción del producto 1",
      price: 100,
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "Producto 2",
      description: "Descripción del producto 2",
      price: 200,
      image: null 
    },
    {
      id: 3,
      name: "Producto 3",
      description: "Descripción del producto 3",
      price: 300,
      image: "https://via.placeholder.com/150"
    }
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setProducts(data);
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
    <>
      <div className="homeScreen">
        <section className={styles.seccionPrincipal}>
          <h2 className={styles.tituloDiv}>Productos</h2>
          <hr className={styles.separador} />
          {products.map((product) => (
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