import React from "react";
import "./homescreen.css";

const HomeScreen = () => {
    return (
        <div className="homeScreen">
            <header className="header">
            <h1 className="Nombre">Nombre Web</h1>
            <div className="Carrito">🛒</div>
            </header>

            <section className="top-bar">
                <div className="nav-buttons">
                    <button className="navbutton"> Categorias </button>
                    <button className="navbutton"> Vender </button>
                    <button className="navbutton"> Ingresar </button>

                </div>
            </section>

            <section className="search-bar">
                <div class="search-bar-container">
                    <input type="text" class="search-bar" placeholder="Buscar..."></input>
                </div>
            </section>

            <main className="categories">
                <button className="category">Cat A</button>
                <button className="category">Cat B</button>
                <button className="category">Cat C</button>
                <button className="category">Cat D</button>
                <button className="category">Cat E</button>
                <button className="category">Cat F</button>
            </main>

            <footer>
                <div className="TxtFooter">
                    <h1>INFO WEB</h1>
                </div>
            </footer>
        </div>
    );
};

export default HomeScreen;
