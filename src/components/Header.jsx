import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/App.css";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.querySelector('input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm.length < 2) {
      // Show minimal validation
      searchInput.classList.add('error');
      setTimeout(() => searchInput.classList.remove('error'), 2000);
      return;
    }

    setIsSearching(true);
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    searchInput.value = '';
    setIsSearching(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowUserMenu(false);
  };

  return (
    <header className="header">
      <div className="header__content">
        {/* Logo */}
        <Link to="/" className="header__logo">
          ShopEase
        </Link>

        {/* Main Navigation */}
        <nav className="header__nav">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <div className="nav-dropdown">
            <span className="nav-dropdown-label">Categories ▾</span>
            <div className="nav-dropdown-list">
              {categories.map((category) => {
                const categoryStr = String(category);
                return (
                  <Link 
                    key={categoryStr}
                    to={`/category?name=${encodeURIComponent(categoryStr)}`}
                  >
                    {categoryStr.charAt(0).toUpperCase() + categoryStr.slice(1)}
                  </Link>
                );
              })}
            </div>
          </div>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Search form */}
        <div className="header__search">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search products..."
              className="search-input"
              defaultValue={new URLSearchParams(window.location.search).get('search') || ''}
              min="2"
              aria-label="Search products"
              disabled={isSearching}
            />
            <button 
              type="submit" 
              className="search-btn" 
              aria-label="Search"
              disabled={isSearching}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* Right Side Actions */}
        <div className="header__actions">
          {user ? (
            <>
              <Link to="/cart" className="icon-btn cart-icon" aria-label="Cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3H5L5.4 5M7.8 14H20L23 5H5.4M7.8 14L5.4 5M7.8 14L4.8 17M20 17H6.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              <div className="user-menu">
                <button 
                  className="user-menu-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="User menu"
                >
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>
                {showUserMenu && (
                  <div className="user-dropdown" tabIndex={0} onBlur={() => setShowUserMenu(false)}>
                    <div className="user-dropdown-header">
                      <strong>{user.name}</strong>
                      <small>{user.email}</small>
                    </div>
                    <div className="user-dropdown-content">
                      <Link to="/account" onClick={() => setShowUserMenu(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        My Account
                      </Link>
                      <Link to="/wishlist" onClick={() => setShowUserMenu(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        Wishlist
                      </Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setShowUserMenu(false)}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                          </svg>
                          Admin Panel
                        </Link>
                      )}
                      <button onClick={handleLogout} className="logout-menu-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
