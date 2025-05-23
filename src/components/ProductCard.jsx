import React, { useContext } from "react";
import "../styles/App.css";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ToastContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
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

  return (
    <div className="product-card">
      <button
        onClick={handleWishlist}
        className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isWishlisted ? '❤️' : '🤍'}
      </button>
      
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image-wrapper">
          <div className="product-image-container">
            <img src={product.images?.[0] || product.thumbnail} alt={product.title} className="product-image" />
          </div>
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <div className="product-meta">
            <span className="product-price">${product.price.toFixed(2)}</span>
            {product.rating && (
              <div className="product-rating">
                <span>⭐</span>
                <span>{product.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
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
              >
                <span>−</span>
              </button>
              <span className="qty-display">{quantity}</span>
              <button
                className="qty-btn"
                onClick={(e) => handleQuantityChange(e, 'increase')}
                aria-label="Increase quantity"
              >
                <span>+</span>
              </button>
            </div>
            <button
              className="go-to-cart-btn"
              onClick={handleGoToCart}
              aria-label="Go to cart"
            >
              <span>View Cart</span>
              <span className="btn-icon">→</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="add-to-cart-btn"
            aria-label="Add to cart"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
