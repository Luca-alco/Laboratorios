import React from "react";
import "./homescreen.css";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";

const HomeScreen = () => {
    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate('/carrito');
    };

    return (
        <div className="homeScreen">
            <ResponsiveAppBar />

            

            <section className="search-bar">
                <div className="search-bar-container">
                    <input type="text" className="search-bar" placeholder="Buscar..." />
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
