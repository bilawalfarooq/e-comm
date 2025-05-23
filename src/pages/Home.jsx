import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

const heroSlides = [
  {
    title: "Top Electronics Brands",
    headline: "BRANDED",
    subHeadline: "ELECTRONICS",
    sub: "UP TO 50% OFF",
    img: "https://dummyimage.com/420x320/ffb300/fff&text=Electronics",
    cta: "Shop Brands",
    bg: "linear-gradient(120deg, #fff5e0 0%, #fff9ec 100%)"
  }
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(0);
  const slideTimeout = useRef();
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=8")
      .then(res => res.json())
      .then(data => setProducts(data.products));
    fetch("https://dummyjson.com/products/category-list")
      .then(res => res.json())
      .then(data => setCategories(data));
    fetch("https://dummyjson.com/products?limit=100")
      .then(res => res.json())
      .then(data => {
        const uniqueBrands = Array.from(new Set(data.products.map(p => p.brand)));
        setBrands(uniqueBrands.slice(0, 4));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    slideTimeout.current = setTimeout(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearTimeout(slideTimeout.current);
  }, [slide]);

  const goToSlide = idx => {
    setSlide(idx);
    clearTimeout(slideTimeout.current);
  };

  return (
    <main className="home-main">
      {/* Hero Slider */}
      <section className="hero-section glass-card">
        {heroSlides.map((s, idx) => (
          <div
            className={`hero-slide glass-card${slide === idx ? " active" : ""}`}
            key={idx}
            style={{ background: s.bg }}
          >
            <div className="hero-content">
              <div className="hero-text">
                <h3 className="hero-eyebrow">{s.title}</h3>
                <h1 className="hero-headline">
                  {s.headline} <br/> {s.subHeadline}
                </h1>
                <p className="hero-subtitle">{s.sub}</p>
                <button className="hero-cta">{s.cta}</button>
              </div>
              <div className="hero-image">
                <img src={s.img} alt={s.headline} />
              </div>
            </div>
            <div className="hero-controls">
              {heroSlides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  className={`hero-dot${slide === dotIdx ? " active" : ""}`}
                  onClick={() => goToSlide(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Featured Categories */}
      {!loading && (
        <section className="categories-section glass-card">
          <div className="section-header">
            <h2>Featured Categories</h2>
            <Link to="/categories" className="view-all">View All</Link>
          </div>
          <div className="categories-grid">            {categories.slice(0, 6).map((category, idx) => {
              // Ensure category is a string and handle the case
              const categoryStr = String(category);
              return (                <Link to={`/category?name=${encodeURIComponent(categoryStr)}`} className="category-card glass-card" key={idx}>
                  <div className="category-icon">
                    <img 
                      src={`https://dummyimage.com/80x80/2563eb/fff&text=${categoryStr.charAt(0).toUpperCase()}`} 
                      alt={categoryStr} 
                    />
                  </div>
                  <h3>{categoryStr.charAt(0).toUpperCase() + categoryStr.slice(1)}</h3>
                </Link>
              );
            })}
          </div>
        </section>
      )}      {/* Featured Products */}
      {!loading && products.length > 0 && (
        <section className="featured-products glass-card">
          <div className="section-header">
            <h2>Featured Products</h2>
            <Link to="/products" className="view-all">View All</Link>
          </div>
          <div className="featured-products-grid">
            {products.slice(0, 8).map(product => (
              <div className="featured-product-card glass-card" key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <div className="product-image-container">
                    <img src={product.thumbnail} alt={product.title} className="product-image" />
                  </div>
                  <div className="product-details">
                    <h3 className="product-title">{product.title}</h3>
                    <span className="product-price">${product.price.toFixed(2)}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
