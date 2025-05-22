import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { cart } = useContext(CartContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(search)}`;
    }
  };

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header__content container">
        <h1 className="header__logo">
          <Link to="/">ShopEase</Link>
        </h1>
        <form className="header__search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation">
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
        </button>
        <nav className={`header__nav${menuOpen ? " open" : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/products" onClick={closeMenu}>Products</Link>
          <div className="nav-dropdown">
            <span className="nav-dropdown-label">Categories ▾</span>
            <div className="nav-dropdown-list">
              {categories.map((cat) => {
                const name = typeof cat === "string" ? cat : cat.name;
                return (
                  <Link
                    key={typeof cat === "string" ? cat : cat.slug}
                    to={`/category?name=${encodeURIComponent(name)}`}
                    onClick={closeMenu}
                    className="nav-dropdown-item"
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Link>
                );
              })}
            </div>
          </div>
          <Link to="/cart" onClick={closeMenu}>
            Cart <span className="cart-count">{cartCount}</span>
          </Link>
          <Link to="/wishlist" onClick={closeMenu}>Wishlist</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
          <Link to="/login" onClick={closeMenu}>Login</Link>
          <Link to="/signup" onClick={closeMenu}>Sign Up</Link>
          <Link to="/admin" onClick={closeMenu}>Admin Panel</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
