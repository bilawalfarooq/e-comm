import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/App.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.email.match(/^\S+@\S+\.\S+$/) || form.password.length < 4) {
      setError("Please enter valid credentials.");
      return;
    }
    const res = login(form.email, form.password);
    if (res.success) {
      const returnPath = location.state?.from || "/";
      navigate(returnPath);
    } else {
      setError(res.message);
    }
  };

  const setDemoCredentials = (type) => {
    if (type === 'user') {
      setForm({
        email: 'user@demo.com',
        password: 'user123'
      });
    } else {
      setForm({
        email: 'admin@demo.com',
        password: 'admin123'
      });
    }
  };

  return (
    <div className="modern-auth-card">
      <div className="modern-auth-logo">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#2563eb"/><text x="50%" y="56%" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="bold" dy=".3em">S</text></svg>
      </div>
      <h2 className="modern-auth-heading">Login</h2>
      <div className="modern-demo-section">
        <h3>Demo Accounts</h3>
        <div className="demo-buttons">
          <button 
            type="button" 
            onClick={() => setDemoCredentials('user')}
            className="modern-demo-btn"
          >
            Try Demo User
          </button>
          <button 
            type="button" 
            onClick={() => setDemoCredentials('admin')}
            className="modern-demo-btn modern-demo-btn-admin"
          >
            Try Demo Admin
          </button>
        </div>
      </div>
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="modern-auth-input-group">
          <span className="modern-auth-input-icon">@</span>
          <input 
            id="email"
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            type="email" 
            required 
            placeholder="Email"
          />
        </div>
        <div className="modern-auth-input-group">
          <span className="modern-auth-input-icon">
            <svg width="18" height="18" fill="none" stroke="#888" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>
          <input 
            id="password"
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            type="password" 
            required 
            minLength={4} 
            placeholder="Password"
          />
        </div>
        <button className="modern-auth-btn" type="submit">Login</button>
        {error && (
          <div className="modern-auth-error">
            {error.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}
      </form>
      <div className="modern-auth-links">
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
};

export default Login;
