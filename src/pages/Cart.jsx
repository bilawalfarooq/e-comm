import React, { useContext } from "react";
import CartItem from "../components/CartItem";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <div className="container cart-page glass-card">
      <h1 className="cart-title">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>Your cart is empty</p>
          <a href="/products" className="browse-btn">Browse Products</a>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} onRemove={removeFromCart} />
            ))}
          </div>
          <div className="cart-summary glass-card">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {shipping > 0 && (
              <p className="free-shipping-note">Add ${(100 - subtotal).toFixed(2)} more for free shipping</p>
            )}
            <a href="/checkout" className="checkout-btn">
              Proceed to Checkout
            </a>
            <a href="/products" className="continue-shopping">
              Continue Shopping
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
