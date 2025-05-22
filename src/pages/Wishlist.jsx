import React, { useContext } from "react";
import "../styles/App.css";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

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
            <ProductCard key={item.id} product={item} onAddToCart={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
