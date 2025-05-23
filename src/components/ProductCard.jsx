import React, { useContext } from "react";
import "../styles/App.css";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ToastContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product, view }) => {
  const { cart, addToCart, removeFromCart, decrementFromCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = !!cartItem;
  const quantity = cartItem ? cartItem.quantity : 0;
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    showToast("Added to cart!", "success");
  };

  const handleGoToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/cart');
  };

  const handleQuantityChange = (e, action) => {
    e.preventDefault();
    e.stopPropagation();
    if (action === 'increase') {
      addToCart(product);
    } else {
      decrementFromCart(product.id);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
      showToast("Removed from wishlist", "info");
    } else {
      addToWishlist(product);
      showToast("Added to wishlist!", "success");
    }
  };

  if (view === 'list') {
    return (
      <div className="product-list-item-content">
        <div className="product-list-image">
          <img src={product.images?.[0] || product.thumbnail} alt={product.title} />
        </div>
        <div className="product-list-info">
          <div className="product-list-title" title={product.title}>{product.title}</div>
          <div className="product-list-badges">
            {product.brand && <span className="product-list-brand">{product.brand}</span>}
            {product.category && <span className="product-list-category">{product.category}</span>}
            <span className="product-price-badge">${product.price.toFixed(2)}</span>
            {product.rating && (
              <span className="product-rating-badge" title="Rating">
                <svg width="16" height="16" fill="#fbbf24" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                {product.rating.toFixed(1)}
              </span>
            )}
          </div>
          <div className="product-list-desc" title={product.description}>{product.description}</div>
        </div>
        <div className="product-list-actions">
          <div className="product-actions">
            {isInCart ? (
              <div className="cart-controls">
                <div className="quantity-controls">
                  <button className="qty-btn" onClick={(e) => handleQuantityChange(e, 'decrease')} aria-label="Decrease quantity" tabIndex={0}><span>−</span></button>
                  <span className="qty-display">{quantity}</span>
                  <button className="qty-btn" onClick={(e) => handleQuantityChange(e, 'increase')} aria-label="Increase quantity" tabIndex={0}><span>+</span></button>
                </div>
                <button className="go-to-cart-btn" onClick={handleGoToCart} aria-label="Go to cart" tabIndex={0}>
                  <span>View Cart</span>
                  <span className="btn-icon" aria-hidden>→</span>
                  <span className="action-tooltip">Go to cart</span>
                </button>
              </div>
            ) : (
              <button onClick={handleAddToCart} className="add-to-cart-btn" aria-label="Add to cart" tabIndex={0}>
                <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24" style={{marginRight:6}}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                Add to Cart
                <span className="action-tooltip">Add to cart</span>
              </button>
            )}
          </div>
        </div>
        <button
          onClick={handleWishlist}
          className={`wishlist-btn modern-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          tabIndex={0}
        >
          {isWishlisted ? (
            <svg width="22" height="22" fill="#ef4444" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          ) : (
            <svg width="22" height="22" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          )}
          <span className="action-tooltip">{isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="product-card modern-product-card">
      <div className="product-card-header">
        <button
          onClick={handleWishlist}
          className={`wishlist-btn modern-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          tabIndex={0}
        >
          {isWishlisted ? (
            <svg width="22" height="22" fill="#ef4444" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          ) : (
            <svg width="22" height="22" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          )}
          <span className="action-tooltip">{isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}</span>
        </button>
      </div>
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image-wrapper modern-image-shadow">
          <div className="product-image-container">
            <img src={product.images?.[0] || product.thumbnail} alt={product.title} className="product-image" />
          </div>
        </div>
        <div className="product-info">
          <h3 className="product-title" title={product.title} style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{product.title}</h3>
          <div className="product-list-badges">
            {product.brand && <span className="product-list-brand">{product.brand}</span>}
            {product.category && <span className="product-list-category">{product.category}</span>}
            <span className="product-price-badge">${product.price.toFixed(2)}</span>
            {product.rating && (
              <span className="product-rating-badge" title="Rating">
                <svg width="16" height="16" fill="#fbbf24" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                {product.rating.toFixed(1)}
              </span>
            )}
          </div>
          <div className="product-list-desc" title={product.description}>{product.description}</div>
        </div>
      </Link>
      <div className="product-actions">
        {isInCart ? (
          <div className="cart-controls">
            <div className="quantity-controls">
              <button
                className="qty-btn"
                onClick={(e) => handleQuantityChange(e, 'decrease')}
                aria-label="Decrease quantity"
                tabIndex={0}
              >
                <span>−</span>
              </button>
              <span className="qty-display">{quantity}</span>
              <button
                className="qty-btn"
                onClick={(e) => handleQuantityChange(e, 'increase')}
                aria-label="Increase quantity"
                tabIndex={0}
              >
                <span>+</span>
              </button>
            </div>
            <button
              className="go-to-cart-btn"
              onClick={handleGoToCart}
              aria-label="Go to cart"
              tabIndex={0}
            >
              <span>View Cart</span>
              <span className="btn-icon" aria-hidden>→</span>
              <span className="action-tooltip">Go to cart</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="add-to-cart-btn"
            aria-label="Add to cart"
            tabIndex={0}
          >
            <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24" style={{marginRight:6}}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Add to Cart
            <span className="action-tooltip">Add to cart</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
