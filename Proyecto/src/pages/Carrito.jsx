import React from "react";
import "./carrito.css";

function Carrito() {
  return (
    <>
      <header className="Header">
        <h1 className="Nombre">Nombre Web</h1>
      </header>

      <main>
        <div class="producto">
          <img
            src="https://static.hendel.com/media/catalog/product/cache/b866fd8d147dcce474dc8744e477ca66/5/4/54232_az_0.jpg"
            alt="Producto"
          />
          <div class="info">
            <p>Nombre Producto</p>
            <p>Cantidad: </p>
            <p>$</p>
          </div>
        </div>

        <button onClick className="BotonVaciarCarro">
          Vaciar Carrito
        </button>
        <p>Total: </p>
        <button type="submit">Continuar Compra</button>
      </main>

      <footer>
        <div className="TxtFooter">
          <h1>INFO WEB</h1>
        </div>
      </footer>
    </>
  );
}

export default Carrito;
