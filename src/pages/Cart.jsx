import React, { useContext } from "react";
import CartItem from "../components/CartItem";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} onRemove={removeFromCart} />
          ))}
          <div className="cart-total">Total: ${total.toFixed(2)}</div>
        </>
      )}
    </div>
  );
};

export default Cart;
