import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./gstprod2.css";
import "./users.css";

const Gstprod2 = () => {
  // Estado para el stock del producto
  const [stock, setStock] = useState(10); // Stock inicial
  // Función para modificar el stock
  const modifyStock = (amount) => {
    setStock((prevStock) => prevStock + amount);
  };
  // Función para bajar el stock
  const decreaseStock = () => {
    if (stock > 0) {
      setStock((prevStock) => prevStock - 1);
    } else {
      alert("No hay más stock disponible");
    }
  };

  return (
    <>
    <header className="HeaderProducts">
        <h1 className="Nombre">Nombre Web</h1>

        <div className="Carrito">🛒</div>
      </header>
    <div>
      <Link to="/" className="home-button">
        🏠 Inicio
      </Link>
      <div className="product flex">
        <div className="mb-4"></div>
        <div className="large-text flex">
          <span className="large-text">Home</span>{" > "}
          <span className="large-text">Hogar</span>{" > "}
          <span className="large-text">Silla de comedor</span>{" > "}
        </div>
        <div className="mb-5"></div>
        <div className="infoPrincipal">
          <img
            src="https://http2.mlstatic.com/D_NQ_NP_2X_734896-MLA74650241762_022024-F.webp"
            alt="Foto de perfil"
            className="fotoProducto"
          />

          <div className="infoDetalles w-1/2 p-4">
            <h2 className="text-2xl font-bold">Silla de comedor</h2>
            <p>
              Descripción: Fabricadas en PVC, estas sillas son resistentes y
              duraderas, garantizando un uso prolongado.
            </p>
            <p>Precio: $100</p>
            <p>Stock disponible: {stock}</p>

            <div className="buttons mt-4">
              <button
                onClick={() => modifyStock(1)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Modificar Stock (+1)
              </button>

              <button
                onClick={decreaseStock}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Bajar Stock (-1)
              </button>
            </div>
          </div>
        </div>
        <div className="mb-5"></div>

        <div className="flex items-start mt-4">
          <div className="text-blue-600 mt-1 mr-3">
            <span className="inline ml-1">🔄</span>
            <h3 className="font-medium text-gray-900 inline">
              Devolucion Facil
            </h3>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            Politica de devolucion de 30 dias
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Gstprod2;