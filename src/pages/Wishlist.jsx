import React, { useContext } from "react";
import "../styles/App.css";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, setWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleClearWishlist = () => setWishlist([]);

  return (
    <div className="wishlist-enhanced-bg">
      <div className="wishlist-enhanced-card">
        <div className="wishlist-header-row">
          <span className="wishlist-title">
            <svg width="28" height="28" fill="#ef4444" viewBox="0 0 24 24" style={{marginRight:8,verticalAlign:'middle'}}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            My Wishlist
          </span>
          {wishlist.length > 0 && (
            <button className="clear-wishlist-btn" onClick={handleClearWishlist}>
              Clear Wishlist
            </button>
          )}
        </div>
        <hr className="wishlist-divider" />
        {wishlist.length === 0 ? (
          <div className="wishlist-empty-state">
            <img src="https://undraw.co/api/illustrations/empty_cart.svg" alt="Empty Wishlist" style={{width:140,marginBottom:16}} />
            <h3>Your wishlist is empty!</h3>
            <p>Start adding products you love. <span role="img" aria-label="heart">❤️</span></p>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <div className="wishlist-product-card" key={item.id}>
                <ProductCard product={item} />
                <div className="wishlist-actions-row">
                  <button className="move-to-cart-btn" onClick={() => addToCart(item)}>
                    Move to Cart
                  </button>
                  <button className="remove-wishlist-btn" onClick={() => removeFromWishlist(item.id)}>
                    <svg width="18" height="18" fill="#ef4444" viewBox="0 0 24 24"><path d="M3 6h18" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/><path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="#ef4444" strokeWidth="2"/><path d="M10 11v6M14 11v6" stroke="#ef4444" strokeWidth="2"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
