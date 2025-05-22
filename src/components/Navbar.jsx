import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/">ShopEase</Link>
      </div>
      <div className="navbar__cart">
        <Link to="/cart">
          🛒 <span className="cart-count">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
