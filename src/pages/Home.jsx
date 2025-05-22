import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

const heroSlides = [
  {
    title: "Best Deal Online on smart watches",
    headline: "SMART WEARABLE.",
    sub: "UP TO 80% OFF",
    img: "https://dummyimage.com/320x220/2563eb/fff&text=Smart+Watch",
    cta: "Shop Now",
    bg: "#e3e9f7"
  },
  {
    title: "Grab the best deal on Smartphones",
    headline: "LATEST SMARTPHONES",
    sub: "UP TO 60% OFF",
    img: "https://dummyimage.com/320x220/22c55e/fff&text=Smartphone",
    cta: "View Phones",
    bg: "#e6f7f1"
  },
  {
    title: "Top Electronics Brands",
    headline: "BRANDED ELECTRONICS",
    sub: "UP TO 50% OFF",
    img: "https://dummyimage.com/320x220/ffb300/fff&text=Electronics",
    cta: "Shop Brands",
    bg: "#fffbe6"
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
    fetch("https://dummyjson.com/products/categories")
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

  // Hero slider auto-advance
  useEffect(() => {
    slideTimeout.current = setTimeout(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearTimeout(slideTimeout.current);
  }, [slide]);

  const goToSlide = idx => {
    setSlide(idx);
    clearTimeout(slideTimeout.current);
  };

  return (
    <main className="home-main">
      {/* Hero Slider */}
      <section className="hero-slider" style={{ width: '100vw', height: '100vh', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', position: 'relative' }}>
        {heroSlides.map((s, idx) => (
          <div
            className={`hero-slide${slide === idx ? " active" : ""}`}
            key={idx}
            style={{ background: s.bg, display: slide === idx ? 'flex' : 'none', height: '100vh', minHeight: '100vh' }}
          >
            <div className="banner-content">
              <h2>{s.title}</h2>
              <h1>{s.headline}</h1>
              <p>{s.sub}</p>
              <button className="banner-btn">{s.cta}</button>
            </div>
            <div className="banner-img">
              <img src={s.img} alt={s.headline} />
            </div>
          </div>
        ))}
        <div className="hero-slider-dots">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              className={`hero-dot${slide === idx ? " active" : ""}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="home-section">
        <div className="section-header">
          <h3>Grab the best deal on <span>Smartphones</span></h3>
          <Link to="/products?category=smartphones" className="view-all-link">View All</Link>
        </div>
        <div className="product-scroll">
          {products.slice(0, 6).map(product => (
            <Link to={`/product/${product.id}`} className="product-card home-product-card" key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={product.thumbnail} alt={product.title} />
              <div className="product-info">
                <h4>{product.title}</h4>
                <div className="product-price-row">
                  <span className="product-price">₹{product.price * 80}</span>
                  <span className="product-discount">Save: ₹{product.discountPercentage ? Math.round(product.price * 80 * product.discountPercentage / 100) : 0}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Categories */}
      <section className="home-section">
        <div className="section-header">
          <h3>Shop From <span>Top Categories</span></h3>
          <Link to="/products" className="view-all-link">View All</Link>
        </div>
        <div className="category-scroll">
          {categories.slice(0, 8).map(cat => {
            let catName = "";
            if (typeof cat === "string") catName = cat;
            else if (cat && typeof cat.name === "string") catName = cat.name;
            if (typeof catName !== "string") catName = "";
            return (
              <div className="category-card" key={catName}>
                <div className="category-icon">
                  <img src={`https://dummyimage.com/60x60/2563eb/fff&text=${catName && typeof catName === 'string' ? catName.charAt(0).toUpperCase() : ''}`} alt={catName} />
                </div>
                <span>{catName && typeof catName === 'string' ? catName.charAt(0).toUpperCase() + catName.slice(1) : ''}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top Brands */}
      <section className="home-section">
        <div className="section-header">
          <h3>Top <span>Electronics Brands</span></h3>
          <Link to="/products" className="view-all-link">View All</Link>
        </div>
        <div className="brand-scroll">
          {brands.map(brand => (
            <div className="brand-card" key={brand}>
              <div className="brand-logo">
                <img src={`https://dummyimage.com/80x80/fff/2563eb&text=${brand.charAt(0).toUpperCase()}`} alt={brand} />
              </div>
              <div className="brand-info">
                <span>{brand}</span>
                <span className="brand-offer">UP TO 80% OFF</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
