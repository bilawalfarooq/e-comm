import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import OrderTracking from "../components/OrderTracking";
import AddressAutocomplete from "../components/AddressAutocomplete";

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
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
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
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  
  // Load user's saved information
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        // Use saved address if available
        address: user.savedAddress?.address || "",
        city: user.savedAddress?.city || "",
        state: user.savedAddress?.state || "",
        zip: user.savedAddress?.zip || ""
      }));
    }
  }, [user]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  const handleAddressSelect = (address) => {
    setForm(prev => ({
      ...prev,
      address: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip
    }));
    // Clear any address-related errors
    setErrors(prev => ({
      ...prev,
      address: null,
      city: null,
      state: null,
      zip: null
    }));
  };

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
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      cart.forEach(item => removeFromCart(item.id));
      setSubmitted(true);
    } catch (error) {
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardType = getCardType(form.cardNumber);

  if (submitted) {
    return (
      <div className="container checkout-container glass-card">
        <div className="order-success">
          <svg className="success-icon" viewBox="0 0 24 24" width="64" height="64">
            <path fill="none" stroke="currentColor" strokeWidth="2" d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <path fill="none" stroke="currentColor" strokeWidth="2" d="M22 4L12 14.01l-3-3"/>
          </svg>
          <h2>Thank you for your order!</h2>
          <p className="order-id">Order #{Math.floor(Math.random() * 1000000)}</p>
          <p className="confirmation-text">
            We've sent a confirmation email to {form.email}.<br/>
            You will receive updates about your order status.
          </p>
          <div className="order-details">
            <h3>Order Summary</h3>
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
          </div>
          <OrderTracking currentStep={1} />
          <div className="action-buttons">
            <a href="/products" className="continue-shopping">Continue Shopping</a>
            <a href="/account" className="view-order">View Order</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-container glass-card">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-layout glass-card">
        <form className="checkout-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
          <div className="form-section">
            <h2>Contact Information</h2>
            <div className="checkout-user-info">
              <p>Logged in as: <strong>{user.email}</strong></p>
            </div>
            <div className="form-group" style={{ display: 'none' }}>
              <input 
                type="email"
                name="email"
                value={form.email}
                readOnly
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Shipping Address</h2>
            {user.savedAddress && (
              <div className="saved-address">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={useDefaultAddress}
                    onChange={(e) => {
                      setUseDefaultAddress(e.target.checked);
                      if (e.target.checked) {
                        setForm(prev => ({
                          ...prev,
                          address: user.savedAddress.address,
                          city: user.savedAddress.city,
                          state: user.savedAddress.state,
                          zip: user.savedAddress.zip
                        }));
                      }
                    }}
                  />
                  Use saved address
                </label>
                {useDefaultAddress && (
                  <div className="default-address">
                    <p>{user.savedAddress.address}</p>
                    <p>{user.savedAddress.city}, {user.savedAddress.state} {user.savedAddress.zip}</p>
                  </div>
                )}
              </div>
            )}
            
            {(!user.savedAddress || !useDefaultAddress) && (
              <>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    id="name"
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    required 
                    className={errors.name ? 'error' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <AddressAutocomplete
                    onSelect={handleAddressSelect}
                    disabled={isSubmitting}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-row three-cols">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input 
                      id="city"
                      name="city" 
                      value={form.city} 
                      onChange={handleChange} 
                      required 
                      className={errors.city ? 'error' : ''}
                      disabled={isSubmitting}
                      readOnly
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input 
                      id="state"
                      name="state" 
                      value={form.state} 
                      onChange={handleChange} 
                      required 
                      className={errors.state ? 'error' : ''}
                      disabled={isSubmitting}
                      readOnly
                    />
                    {errors.state && <span className="error-message">{errors.state}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="zip">ZIP Code</label>
                    <input 
                      id="zip"
                      name="zip" 
                      value={form.zip} 
                      onChange={handleChange} 
                      required 
                      className={errors.zip ? 'error' : ''}
                      disabled={isSubmitting}
                      pattern="\d{4,10}"
                      readOnly
                    />
                    {errors.zip && <span className="error-message">{errors.zip}</span>}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="form-section">
            <h2>Payment Method</h2>
            <div className="payment-options">
              <label className="pay-label">
                <input 
                  type="radio" 
                  name="payment" 
                  value="card" 
                  checked={form.payment === "card"} 
                  onChange={handleChange}
                  disabled={isSubmitting}
                /> 
                Credit/Debit Card
              </label>
              <label className="pay-label">
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod" 
                  checked={form.payment === "cod"} 
                  onChange={handleChange}
                  disabled={isSubmitting}
                /> 
                Cash on Delivery
              </label>
            </div>

            {form.payment === "card" && (
              <div className="checkout-card-fields">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <div className="card-input-row">
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={16}
                      required
                      inputMode="numeric"
                      autoComplete="cc-number"
                      className={`card-number-input ${errors.cardNumber ? 'error' : ''}`}
                      disabled={isSubmitting}
                    />
                    {cardType && (
                      <span className={`card-icon card-icon-${cardType}`}></span>
                    )}
                  </div>
                  {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardExpiry">Expiry Date</label>
                    <input
                      id="cardExpiry"
                      name="cardExpiry"
                      value={form.cardExpiry}
                      onChange={handleChange}
                      type="month"
                      required
                      className={errors.cardExpiry ? 'error' : ''}
                      style={{ maxWidth: 140 }}
                      autoComplete="cc-exp"
                      disabled={isSubmitting}
                    />
                    {errors.cardExpiry && <span className="error-message">{errors.cardExpiry}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardCVV">CVV</label>
                    <input
                      id="cardCVV"
                      name="cardCVV"
                      value={form.cardCVV}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={3}
                      required
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      className={errors.cardCVV ? 'error' : ''}
                      style={{ maxWidth: 80 }}
                      disabled={isSubmitting}
                    />
                    {errors.cardCVV && <span className="error-message">{errors.cardCVV}</span>}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="checkout-summary glass-card">
            <h3>Order Summary</h3>
            {cart.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <>
                <ul className="checkout-list">
                  {cart.map(item => (
                    <li key={item.id} className="checkout-item">
                      <span>{item.title} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
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
              </>
            )}
          </div>

          {errors.submit && (
            <div className="form-error">
              <span className="error-message">{errors.submit}</span>
            </div>
          )}

          <button 
            className="checkout-btn" 
            type="submit" 
            disabled={cart.length === 0 || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              'Place Order'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
