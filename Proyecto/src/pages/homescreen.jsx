import React from "react";
import "./homescreen.css";
import { Link } from "react-router-dom";



const HomeScreen = () => {
    return (
        <div className="homeScreen">
            <header className="header">
            <h1 className="Nombre">Nombre Web</h1>
            <div className="Carrito">🛒</div>
            </header>

            <section className="top-bar">
                <div className="nav-buttons">
                    <Link to= "/productos">
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
