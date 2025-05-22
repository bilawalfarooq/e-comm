import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

const Products = ({ products }) => {
  const { addToCart } = useContext(CartContext);
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const searchTerm = params.get("search")?.toLowerCase() || "";
  const filtered = searchTerm
    ? products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      )
    : products;

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container product-list">
      <h2>All Products</h2>
      <div className="product-grid">
        {filtered.length === 0 ? (
          <p>No products found.</p>
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

export default Products;
