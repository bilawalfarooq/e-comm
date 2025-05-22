import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const initialForm = {
  name: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  payment: "card",
  cardNumber: "",
  cardExpiry: "",
  cardCVV: ""
};

function getCardType(number) {
  if (/^4/.test(number)) return "visa";
  if (/^5[1-5]/.test(number)) return "mastercard";
  return null;
}

const Checkout = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) errs.email = "Valid email required.";
    if (!form.address.trim()) errs.address = "Address is required.";
    if (!form.city.trim()) errs.city = "City is required.";
    if (!form.state.trim()) errs.state = "State is required.";
    if (!form.zip.match(/^\d{4,10}$/)) errs.zip = "Valid ZIP required.";
    if (form.payment === "card") {
      if (!form.cardNumber.match(/^\d{16}$/)) errs.cardNumber = "16-digit card number required.";
      if (!form.cardExpiry) errs.cardExpiry = "Expiry required.";
      if (!form.cardCVV.match(/^\d{3}$/)) errs.cardCVV = "3-digit CVV required.";
    }
    return errs;
  };

  const handleChange = e => {
    let { name, value } = e.target;
    if (name === "cardNumber") value = value.replace(/\D/g, "").slice(0, 16);
    if (name === "cardCVV") value = value.replace(/\D/g, "").slice(0, 3);
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    cart.forEach(item => removeFromCart(item.id));
    setSubmitted(true);
  };

  const cardType = getCardType(form.cardNumber);

  if (submitted) {
    return (
      <div className="container checkout-container">
        <h2>Thank you for your order!</h2>
        <p>Your order has been placed successfully. (Demo only)</p>
      </div>
    );
  }

  return (
    <div className="container checkout-container">
      <h2>Checkout</h2>
      <form className="checkout-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
        <div className="checkout-fields">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
          {errors.name && <span className="checkout-error">{errors.name}</span>}
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
          {errors.email && <span className="checkout-error">{errors.email}</span>}
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required />
          {errors.address && <span className="checkout-error">{errors.address}</span>}
          <div className="checkout-row">
            <input name="city" value={form.city} onChange={handleChange} placeholder="City" required />
            <input name="state" value={form.state} onChange={handleChange} placeholder="State" required />
            <input name="zip" value={form.zip} onChange={handleChange} placeholder="ZIP" required />
          </div>
          {(errors.city || errors.state || errors.zip) && (
            <div className="checkout-error-row">
              {errors.city && <span className="checkout-error">{errors.city}</span>}
              {errors.state && <span className="checkout-error">{errors.state}</span>}
              {errors.zip && <span className="checkout-error">{errors.zip}</span>}
            </div>
          )}
          <div className="checkout-row">
            <label className="pay-label"><input type="radio" name="payment" value="card" checked={form.payment === "card"} onChange={handleChange} /> Card</label>
            <label className="pay-label"><input type="radio" name="payment" value="cod" checked={form.payment === "cod"} onChange={handleChange} /> Cash on Delivery</label>
          </div>
          {form.payment === "card" && (
            <div className="checkout-card-fields">
              <div className="card-input-row">
                <input
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder="Card Number"
                  maxLength={16}
                  required
                  inputMode="numeric"
                  autoComplete="cc-number"
                  className="card-number-input"
                />
                {cardType && (
                  <span className={`card-icon card-icon-${cardType}`}></span>
                )}
              </div>
              {errors.cardNumber && <span className="checkout-error">{errors.cardNumber}</span>}
              <div className="checkout-row">
                <input
                  name="cardExpiry"
                  value={form.cardExpiry}
                  onChange={handleChange}
                  placeholder="MM/YYYY"
                  type="month"
                  required
                  style={{ maxWidth: 140 }}
                  autoComplete="cc-exp"
                />
                <input
                  name="cardCVV"
                  value={form.cardCVV}
                  onChange={handleChange}
                  placeholder="CVV"
                  maxLength={3}
                  required
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  style={{ maxWidth: 80 }}
                />
              </div>
              <div className="checkout-error-row">
                {errors.cardExpiry && <span className="checkout-error">{errors.cardExpiry}</span>}
                {errors.cardCVV && <span className="checkout-error">{errors.cardCVV}</span>}
              </div>
            </div>
          )}
        </div>
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {cart.length === 0 ? <p>No items in cart.</p> : (
            <ul className="checkout-list">
              {cart.map(item => (
                <li key={item.id}>
                  <span>{item.title} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="checkout-total">Total: <b>${total.toFixed(2)}</b></div>
        </div>
        <button className="checkout-btn" type="submit" disabled={cart.length === 0}>Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
