import React, { useContext, useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

const getUnique = (arr, key) => Array.from(new Set(arr.map((item) => item[key]))).filter(Boolean);

const Products = ({ products }) => {
  const { addToCart } = useContext(CartContext);
  const { search } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [priceLimits, setPriceLimits] = useState([0, 0]);
  const params = new URLSearchParams(search);
  const searchTerm = params.get("search")?.toLowerCase() || "";

  // Get unique categories and brands
  const categories = getUnique(products, "category");
  const brands = getUnique(products, "brand");

  // Get min/max price
  useEffect(() => {
    if (products.length) {
      const prices = products.map((p) => p.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setPriceLimits([min, max]);
      setPriceRange([min, max]);
    }
  }, [products]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = products;
      if (searchTerm) {
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.category?.toLowerCase().includes(searchTerm) ||
            p.brand?.toLowerCase().includes(searchTerm)
        );
      }
      if (category) {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (brand) {
        filtered = filtered.filter((p) => p.brand === brand);
      }
      filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
      // Sort
      if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
      if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
      if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
      if (sort === "name") filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
      setFilteredProducts(filtered);
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchTerm, products, category, brand, priceRange, sort]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container product-list glass-card">
      <div className="products-controls-row">
        {/* View Toggle */}
        <div className="view-toggle-group">
          <button className={`view-toggle-btn${view === 'grid' ? ' active' : ''}`} onClick={() => setView('grid')} title="Grid view">
            <svg width="22" height="22" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2" fill={view==='grid'?"#2563eb":"#bbb"}/><rect x="14" y="3" width="7" height="7" rx="2" fill={view==='grid'?"#2563eb":"#bbb"}/><rect x="14" y="14" width="7" height="7" rx="2" fill={view==='grid'?"#2563eb":"#bbb"}/><rect x="3" y="14" width="7" height="7" rx="2" fill={view==='grid'?"#2563eb":"#bbb"}/></svg>
          </button>
          <button className={`view-toggle-btn${view === 'list' ? ' active' : ''}`} onClick={() => setView('list')} title="List view">
            <svg width="22" height="22" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="3" rx="1.5" fill={view==='list'?"#2563eb":"#bbb"}/><rect x="4" y="10.5" width="16" height="3" rx="1.5" fill={view==='list'?"#2563eb":"#bbb"}/><rect x="4" y="16" width="16" height="3" rx="1.5" fill={view==='list'?"#2563eb":"#bbb"}/></svg>
          </button>
        </div>
        {/* Sort */}
        <select className="products-sort-select" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="name">Name</option>
        </select>
        {/* Category Filter */}
        <select className="products-filter-select" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
        {/* Brand Filter */}
        <select className="products-filter-select" value={brand} onChange={e => setBrand(e.target.value)}>
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        {/* Price Range */}
        <div className="products-price-range">
          <label>Price:</label>
          <input
            type="range"
            min={priceLimits[0]}
            max={priceLimits[1]}
            value={priceRange[0]}
            onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
            style={{marginRight:8}}
          />
          <input
            type="range"
            min={priceLimits[0]}
            max={priceLimits[1]}
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], +e.target.value])}
          />
          <span className="price-range-label">${priceRange[0]} - ${priceRange[1]}</span>
        </div>
      </div>
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
      <div className={(view === 'grid' ? "product-grid" : "product-list-view") + (!loading ? " fade-in" : "") }>
        {loading ? (
          <div className="products-skeleton-row">
            {Array.from({length: view === 'grid' ? 8 : 4}).map((_, i) => (
              <div key={i} className={view === 'grid' ? 'skeleton-card' : 'skeleton-list-item'} />
            ))}
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
            <div key={product.id} onClick={() => handleCardClick(product.id)} className={view === 'list' ? 'product-list-item' : ''}>
              <ProductCard product={product} onAddToCart={addToCart} view={view} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
