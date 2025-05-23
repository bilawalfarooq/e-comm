import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { WishlistContext } from "../context/WishlistContext";

const ProductDetail = ({ products = [] }) => {
  const { id } = useParams();
  const { cart, addToCart, removeFromCart, decrementFromCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const [product, setProduct] = useState(() => products.find((p) => p.id === parseInt(id)));
  const [loading, setLoading] = useState(!product);

  // Demo reviews state
  const [reviews, setReviews] = useState([
    { id: 1, user: "Ali", rating: 5, comment: "Great product!" },
    { id: 2, user: "Sara", rating: 4, comment: "Good value for money." },
  ]);
  const [newReview, setNewReview] = useState({ user: "", rating: 5, comment: "" });

  useEffect(() => {
    if (!product) {
      setLoading(true);
      fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id, product]);

  if (loading) return <div className="container">Loading product...</div>;
  if (!product) return <div className="container">Product not found.</div>;

  // Only access cartItem after product is defined
  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = !!cartItem;
  const quantity = cartItem ? cartItem.quantity : 0;

  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const handleWishlist = (e) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviews([
      ...reviews,
      { ...newReview, id: Date.now(), rating: Number(newReview.rating) },
    ]);
    setNewReview({ user: "", rating: 5, comment: "" });
  };

  return (
    <>
      <div className="product-detail-container">
        <div className="detail-image-col">
          <img src={product.images?.[0] || product.thumbnail} alt={product.title} className="detail-image" />
        </div>
        <div className="detail-info-col">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <h2 style={{margin:0}}>{product.title}</h2>
            <button
              onClick={handleWishlist}
              className={`wishlist-btn modern-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              style={{marginLeft:4}}
            >
              {isWishlisted ? (
                <svg width="26" height="26" fill="#ef4444" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              ) : (
                <svg width="26" height="26" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              )}
            </button>
          </div>
          <div className="detail-badges">
            <span className="detail-price-badge">${product.price}</span>
            {product.rating && (
              <span className="detail-rating-badge">
                <svg width="16" height="16" fill="#fbbf24" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                {product.rating.toFixed(1)}
              </span>
            )}
          </div>
          <p className="detail-desc">{product.description}</p>
          {isInCart ? (
            <div className="cart-qty-controls">
              <button
                className="qty-btn"
                onClick={() => decrementFromCart(product.id)}
              >-</button>
              <span className="qty-value">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => addToCart(product)}
              >+</button>
              <button
                className="view-cart-btn"
                style={{ marginLeft: 16 }}
                onClick={() => window.location.href = '/cart'}
              >
                View Cart
              </button>
            </div>
          ) : (
            <button onClick={() => addToCart(product)} className="add-to-cart-btn">Add to Cart</button>
          )}
          <div className="reviews-section">
            <h3>Product Reviews</h3>
            {reviews.length === 0 ? <p>No reviews yet.</p> : (
              <ul className="modern-review-list">
                {reviews.map((r) => (
                  <li key={r.id} className="modern-review-item">
                    <span className="modern-review-user" title={r.user}>{r.user.charAt(0).toUpperCase()}</span>
                    <span className="modern-review-rating">
                      <svg width="14" height="14" fill="#fbbf24" viewBox="0 0 24 24" style={{marginRight:2}}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      {r.rating}
                    </span>
                    <span className="modern-review-comment">{r.comment}</span>
                  </li>
                ))}
              </ul>
            )}
            <form className="modern-review-form" onSubmit={handleReviewSubmit}>
              <input
                type="text"
                name="user"
                placeholder="Your name"
                value={newReview.user}
                onChange={handleReviewChange}
                required
              />
              <select
                name="rating"
                value={newReview.rating}
                onChange={handleReviewChange}
              >
                {[5,4,3,2,1].map((n) => (
                  <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>
                ))}
              </select>
              <input
                type="text"
                name="comment"
                placeholder="Your review"
                value={newReview.comment}
                onChange={handleReviewChange}
                required
              />
              <button type="submit" className="add-to-cart-btn">Submit Review</button>
            </form>
          </div>
        </div>
      </div>
      {/* Recommended Products Section */}
      {products.length > 1 && (
        <div className="recommended-products-section container">
          <h3>Recommended Products</h3>
          <div className="product-grid">
            {products
              .filter((p) => p.id !== product.id)
              .sort(() => 0.5 - Math.random())
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
