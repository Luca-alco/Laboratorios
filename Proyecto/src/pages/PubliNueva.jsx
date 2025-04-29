import React from "react";
import "./PubliNueva.css";

function PubliNueva() {
  return (
    <>
        <header>
            <h1 className="Nombre">Nombre Web</h1>
        </header>

        <h1 className="PublicacionNueva">Publicación Nueva</h1>

        <main style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="categoria-container">
            <p>Categoría del producto:</p>
            <select className="categoria-select">
                <option value="Samsung">Samsung</option>
                <option value="Apple">Apple</option>
                <option value="Xiaomi">Xiaomi</option>
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

        <footer>
            <div className="TxtFooter">
                <h1>INFO WEB</h1>
            </div>
        </footer>
      
    </>
  );
}

export default PubliNueva;



