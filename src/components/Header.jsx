import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
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
      setShowSearch(false);
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
        <button className="search-icon-btn" onClick={() => setShowSearch(true)} aria-label="Open search">
          <svg className="search-icon" width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#2563eb" strokeWidth="2"/><path stroke="#2563eb" strokeWidth="2" strokeLinecap="round" d="M20 20l-3.5-3.5"/></svg>
        </button>
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
          <Link to="/cart" onClick={closeMenu} className="cart-link" aria-label="Cart">
            <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"><path stroke="#2563eb" strokeWidth="2" d="M6.5 6.5h11l-1.5 9.5h-8z"/><circle cx="9" cy="20" r="1.5" fill="#2563eb"/><circle cx="15" cy="20" r="1.5" fill="#2563eb"/></svg>
            <span className="cart-count">{cartCount}</span>
          </Link>
          <Link to="/wishlist" onClick={closeMenu}>Wishlist</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
          <Link to="/login" onClick={closeMenu}>Login</Link>
        </nav>
        {showSearch && (
          <div className="search-modal" onClick={() => setShowSearch(false)}>
            <div className="search-modal-content" onClick={e => e.stopPropagation()}>
              <form className="header__search" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={handleSearchChange}
                  className="search-input"
                  autoFocus
                />
                <button type="submit" className="search-btn">Search</button>
              </form>
              <button className="search-modal-close" onClick={() => setShowSearch(false)} aria-label="Close search">&times;</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
