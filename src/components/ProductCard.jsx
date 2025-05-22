import React, { useContext } from "react";
import "../styles/App.css";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ToastContext } from "../context/CartContext";

const ProductCard = ({ product, onAddToCart }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { showToast } = useContext(ToastContext);
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
    <div className="product-card">
      <img src={product.images[0]} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p className="product-price">${product.price}</p>
      <button onClick={handleCart} className="add-to-cart-btn">
        Add to Cart
      </button>
      <button
        onClick={handleWishlist}
        className={"wishlist-btn"}
        style={{ marginTop: 8 }}
      >
        {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    </div>
  );
};

export default ProductCard;
