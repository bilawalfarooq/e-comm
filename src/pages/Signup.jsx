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
    <div className="modern-auth-card">
      <div className="modern-auth-logo">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#43e97b"/><text x="50%" y="56%" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="bold" dy=".3em">S</text></svg>
      </div>
      <h2 className="modern-auth-heading">Sign Up</h2>
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="modern-auth-input-group">
          <span className="modern-auth-input-icon">
            <svg width="18" height="18" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M16 16v-1a4 4 0 0 0-8 0v1"/></svg>
          </span>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
        </div>
        <div className="modern-auth-input-group">
          <span className="modern-auth-input-icon">@</span>
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
        </div>
        <div className="modern-auth-input-group">
          <span className="modern-auth-input-icon">
            <svg width="18" height="18" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>
          <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required minLength={4} />
        </div>
        <button className="modern-auth-btn" type="submit">Sign Up</button>
        {error && <div className="modern-auth-error">{error}</div>}
        {success && <div className="modern-auth-success">Signup successful! Redirecting...</div>}
      </form>
      <div className="modern-auth-links" style={{ marginTop: 12 }}>
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default Signup;
