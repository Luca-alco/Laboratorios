import { Link, useNavigate } from "react-router";
import styles from "./listaCatalogo.module.css";
import ResponsiveAppBar from "./ResponsiveAppBar";

function ListaCatalogo() {
  return (
    <>
      <div className="homeScreen">
        <ResponsiveAppBar />
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
