import { Link, useNavigate } from "react-router";
import styles from "./listaCatalogo.module.css";
function ListaCatalogo() {
  const estilo_catalogos = {
    with: "75%",
    bgcolor: "background.paper",
    boxShadow: 1,
    borderRadius: 2,
    p: 2,
    minWidth: 300,
    heigth: "100%",
  };

  return (
    <>
      <div className="homeScreen">
        <header className="header">
          <Link to="/" className="home-button">
            🏠 Inicio
          </Link>
          <h1 className="Nombre">Nombre Web</h1>
          <div className="carrito" onClick={() => useNavigate("/carrito")}>
            🛒
          </div>
          <button onClick={() => useNavigate("/perfil")}>Mi Perfil</button>
        </header>

        <section className="top-bar">
          <div className="nav-buttons">
            <Link to="/productos">
              <button className="navbutton"> Categorias </button>
            </Link>
            <Link to="/gestion-productos">
              <button className="navbutton"> Vender </button>
            </Link>
            <Link to="/login">
              <button className="navbutton">Ingresar</button>
            </Link>
          </div>
        </section>
        <section className={styles.seccionPrincipal}>
          <h2 className={styles.tituloDiv}>Productos</h2>
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
        </section>

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
