import React from "react";

const CartItem = ({ item, onRemove }) => (
  <div className="cart-item">
    <div className="cart-item-image-container">
      <img src={item.images[0]} alt={item.title} className="cart-item-image" />
    </div>
    <div className="cart-item-details">
      <div className="cart-item-header">
        <h4>{item.title}</h4>
        <button 
          onClick={() => onRemove(item.id)} 
          className="remove-btn"
          aria-label="Remove item"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 7H18M8 7V5C8 4.44772 8.44772 4 9 4H15C15.5523 4 16 4.44772 16 5V7M10 11V17M14 11V17M4 7H20V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V7Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="cart-item-price">
        <div className="cart-item-unit-price">${item.price.toFixed(2)} × {item.quantity}</div>
        <div className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    </div>
  </div>
);

export default CartItem;
