import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { useLocation, useNavigate } from "react-router-dom";

const Category = () => {
  const { addToCart } = React.useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } = React.useContext(WishlistContext);
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const category = params.get("name");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const fetchProducts = async () => {
      try {
        const url = category 
          ? `https://dummyjson.com/products/category/${encodeURIComponent(category)}`
          : 'https://dummyjson.com/products';
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setFiltered(data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="category-page glass-card">
      <h2>
        {category 
          ? `Category: ${category.charAt(0).toUpperCase()}${category.slice(1)}`
          : "All Products"
        }
      </h2>
      
      <div className="product-grid">
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="no-products">No products found in this category.</div>
        ) : (
          filtered.map((product) => (
            <div key={product.id} onClick={() => handleCardClick(product.id)}>
              <ProductCard 
                product={product}
                onAddToCart={addToCart}
                isWishlisted={wishlist.some(item => item.id === product.id)}
                onToggleWishlist={() => {
                  const isInWishlist = wishlist.some(item => item.id === product.id);
                  if (isInWishlist) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist(product);
                  }
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;
