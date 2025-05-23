import React, { useContext, useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

const Products = ({ products }) => {
  const { addToCart } = useContext(CartContext);
  const { search } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const params = new URLSearchParams(search);
  const searchTerm = params.get("search")?.toLowerCase() || "";

  useEffect(() => {
    setLoading(true);
    // Simulate search delay for better UX
    const timer = setTimeout(() => {
      const filtered = searchTerm
        ? products.filter(
            (p) =>
              p.title.toLowerCase().includes(searchTerm) ||
              p.description.toLowerCase().includes(searchTerm) ||
              p.category?.toLowerCase().includes(searchTerm) ||
              p.brand?.toLowerCase().includes(searchTerm)
          )
        : products;
      setFilteredProducts(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, products]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container product-list">
      {searchTerm ? (
        <div className="search-results-header">
          <h2>Search Results for "{searchTerm}"</h2>
          <p className="results-count">
            {loading
              ? "Searching..."
              : `Found ${filteredProducts.length} product${
                  filteredProducts.length !== 1 ? "s" : ""
                }`}
          </p>
        </div>
      ) : (
        <h2>All Products</h2>
      )}

      <div className="product-grid">
        {loading ? (
          <div className="loading-products">
            <div className="loading-spinner"></div>
            <p>Searching products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your search or browse our categories</p>
            <button
              className="btn-secondary"
              onClick={() => navigate("/products")}
            >
              View All Products
            </button>
          </div>
        ) : (
          filteredProducts.map((product) => (
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
