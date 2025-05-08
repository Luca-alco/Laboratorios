import { Link, useNavigate } from "react-router-dom";
import styles from "./listaCatalogo.module.css";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useState, useEffect } from 'react';

function ListaCatalogo() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

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
        <ResponsiveAppBar />
        <section className={styles.seccionPrincipal}>
          <h2 className={styles.tituloDiv}>Productos</h2>
          <hr className={styles.separador} />
          {products.map((product) => (
            <div key={product.id}onClick={() => handleProductClick(product.id)}>
              <div className={styles.tarjetaProducto}>
                <div className={styles.imagen}>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className={styles.descrpicion}>
                  <h4>{product.name}</h4>
                  <p className={styles.texto}>{product.description}</p>
                  <p className={styles.texto}>${product.price}</p>
                </div>
                <div className={styles.comfirmar}>
                  <button className="navbutton">Agregar</button>
                </div>
              </div>
              <hr className={styles.separador} />
            </div>
          ))}
        </section>
          {/* <div className={styles.tarjetaProducto}>
            <div className={styles.imagen}>aca va la imagen</div>
            <div className={styles.descrpicion}>
              <h4>Nombre del producto</h4>
              <p className={styles.texto}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                atque illo vel modi, accusamus ullam alias impedit perferendis.
                Laborum, voluptatum.
              </p>
              <p className={styles.texto}>precio</p>
            </div>
            <div className={styles.comfirmar}>
              <button>Agregar</button>
            </div>
          </div>
          <hr className={styles.separador} />
          <div className={styles.tarjetaProducto}>
            <div className={styles.imagen}>aca va la imagen</div>
            <div className={styles.descrpicion}>
              <h4>Nombre del producto</h4>
              <p className={styles.texto}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                atque illo vel modi, accusamus ullam alias impedit perferendis.
                Laborum, voluptatum.
              </p>
              <p className={styles.texto}>precio</p>
            </div>
            <div className={styles.comfirmar}>
              <button>Agregar</button>
            </div>
          </div>
          <hr className={styles.separador} />
          <div className={styles.tarjetaProducto}>
            <div className={styles.imagen}>aca va la imagen</div>
            <div className={styles.descrpicion}>
              <h4>Nombre del producto</h4>
              <p className={styles.texto}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                atque illo vel modi, accusamus ullam alias impedit perferendis.
                Laborum, voluptatum.
              </p>
              <p className={styles.texto}>precio</p>
            </div>
            <div className={styles.comfirmar}>
              <button>Agregar</button>
            </div>
          </div>
          <hr className={styles.separador} />
          <div className={styles.tarjetaProducto}>
            <div className={styles.imagen}>aca va la imagen</div>
            <div className={styles.descrpicion}>
              <h4>Nombre del producto</h4>
              <p className={styles.texto}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                atque illo vel modi, accusamus ullam alias impedit perferendis.
                Laborum, voluptatum.
              </p>
              <p className={styles.texto}>precio</p>
            </div>
            <div className={styles.comfirmar}>
              <button className="navbutton">Agregar</button>
            </div>
          </div>
        </section> */}

        <footer>
          <div className="TxtFooter">
            <h1>INFO WEB</h1>
          </div>
        </footer>
      </div>
    </>
  );
}

export default ListaCatalogo;
