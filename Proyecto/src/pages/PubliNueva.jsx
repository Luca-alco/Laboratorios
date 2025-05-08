import React from "react";
import { Link } from "react-router-dom";
import "./PubliNueva.css";
import "./users.css";

function PubliNueva() {
  return (
    <>
        <main style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="categoria-container">
            <p>Categoría del producto:</p>
            <select className="categoria-select">
                <option value="Samsung">Remera</option>
                <option value="Apple">Pantalón</option>
                <option value="Xiaomi">Zapatillas</option>
            </select>
            
            <div className="descripcion-container">
                <p>Adjuntar foto del producto:</p>
                <input type="file" />
            </div>
            <p>Descripcion del producto: </p>
            <div className="barra-escritura">
            <input
                type="text"
                placeholder="Descripcion"
                className="input-escritura"
            />

            <input className="BotonPublicar" type="submit" value="Publicar"/>
            
        </div>

        </div>

        </main>

      
    </>
  );
}

export default PubliNueva;



