import React, { useContext } from "react";
import "../styles/App.css";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ToastContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { showToast } = useContext(ToastContext);
  const { cart, addToCart, removeFromCart, decrementFromCart } = useContext(CartContext);
  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = !!cartItem;
  const quantity = cartItem ? cartItem.quantity : 0;
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleCart = () => {
    onAddToCart(product);
    showToast("Added to cart!", "success");
  };
  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      showToast("Removed from wishlist", "info");
    } else {
      addToWishlist(product);
      showToast("Added to wishlist!", "success");
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}>
      <img src={product.images[0]} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p className="product-price">${product.price}</p>
      {isInCart ? (
        <div className="cart-qty-controls">
          <button
            className="qty-btn"
            onClick={e => {
              e.preventDefault();
              decrementFromCart(product.id);
            }}
          >-</button>
          <span className="qty-value">{quantity}</span>
          <button
            className="qty-btn"
            onClick={e => {
              e.preventDefault();
              addToCart(product);
            }}
          >+</button>
        </div>
      ) : (
        <button
          onClick={e => { e.preventDefault(); handleCart(); }}
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
      )}
      <button
        onClick={e => { e.preventDefault(); handleWishlist(); }}
        className={"wishlist-btn"}
        style={{ marginTop: 8 }}
      >
        {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    </Link>
  );
};

export default ProductCard;
