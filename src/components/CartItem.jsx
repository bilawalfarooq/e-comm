import React from "react";

const CartItem = ({ item, onRemove }) => (
  <div className="cart-item">
    <img src={item.images[0]} alt={item.title} className="cart-item-image" />
    <div className="cart-item-details">
      <h4>{item.title}</h4>
      <p>Price: ${item.price}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => onRemove(item.id)} className="remove-btn">Remove</button>
    </div>
  </div>
);

export default CartItem;
