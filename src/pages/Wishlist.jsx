import React, { useContext } from "react";
import "../styles/App.css";
import { WishlistContext } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="container wishlist-container">
      <h2>Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="product-grid">
          {wishlist.map((item) => (
            <div className="product-card" key={item.id}>
              <img
                src={item.images[0]}
                alt={item.title}
                className="product-image"
              />
              <h3>{item.title}</h3>
              <p className="product-price">${item.price}</p>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
