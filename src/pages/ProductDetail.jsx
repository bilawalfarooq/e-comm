import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const product = products.find((p) => p.id === parseInt(id));

  // Demo reviews state
  const [reviews, setReviews] = useState([
    { id: 1, user: "Ali", rating: 5, comment: "Great product!" },
    { id: 2, user: "Sara", rating: 4, comment: "Good value for money." },
  ]);
  const [newReview, setNewReview] = useState({ user: "", rating: 5, comment: "" });

  if (!product) return <div>Product not found.</div>;

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
    <div className="container product-detail">
      <img src={product.images[0]} alt={product.title} className="detail-image" />
      <div className="detail-info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className="product-price">${product.price}</p>
        <button onClick={() => addToCart(product)} className="add-to-cart-btn">Add to Cart</button>
        <div className="reviews-section">
          <h3>Product Reviews</h3>
          {reviews.length === 0 ? <p>No reviews yet.</p> : (
            <ul className="reviews-list">
              {reviews.map((r) => (
                <li key={r.id}>
                  <span className="review-user">{r.user}</span> -
                  <span className="review-rating">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  <span className="review-comment">{r.comment}</span>
                </li>
              ))}
            </ul>
          )}
          <form className="review-form" onSubmit={handleReviewSubmit}>
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
  );
};

export default ProductDetail;
