import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.match(/^\S+@\S+\.\S+$/) || form.password.length < 4) {
      setError("Please enter valid details.");
      return;
    }
    const res = signup(form);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="container auth-container">
      <h2>Sign Up</h2>
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required minLength={4} />
        <button className="auth-btn" type="submit">Sign Up</button>
        {error && <div className="checkout-error">{error}</div>}
        {success && <div className="auth-success">Signup successful! Redirecting...</div>}
      </form>
      <div style={{ marginTop: 12 }}>
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Signup;
