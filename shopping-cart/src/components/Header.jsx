import React from "react";
import '../styles/header.css'
import { Link } from "react-router-dom";

const Header = ({ handleLogout, isLoggedIn }) => {
    return (
        <header className="header">
            <h1 >
                <Link to="/" className="header-logo">Shopping Cart</Link>
            </h1>
            <nav>
                {
                    isLoggedIn && (
                        <div className="nav-links" >
                            <Link className="nav-home" to="/">Home</Link>
                            <Link className="nav-cart" to="/cart">Cart</Link>
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    )
                }
            </nav>
        </header>
    )
}

export default Header