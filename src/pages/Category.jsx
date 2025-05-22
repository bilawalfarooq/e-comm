import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { useLocation, useNavigate } from "react-router-dom";

const Category = ({ products }) => {
  const { addToCart } = React.useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } = React.useContext(WishlistContext);
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const category = params.get("name");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (category) {
      setFiltered(products.filter((p) => p.category === category));
    } else {
      setFiltered(products);
    }
  }, [category, products]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container category-container">
      <h2>Category: {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All"}</h2>
      <div className="product-grid">
        {filtered.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          filtered.map((product) => (
            <div key={product.id} onClick={() => handleCardClick(product.id)}>
              <ProductCard product={product} onAddToCart={addToCart} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;
