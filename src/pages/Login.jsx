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
    <div className="container auth-container">
      <h2>Login</h2>
      
      <div className="demo-accounts">
        <h3>Demo Accounts</h3>
        <div className="demo-buttons">
          <button 
            type="button" 
            onClick={() => setDemoCredentials('user')}
            className="demo-btn"
          >
            Try Demo User
          </button>
          <button 
            type="button" 
            onClick={() => setDemoCredentials('admin')}
            className="demo-btn demo-btn-admin"
          >
            Try Demo Admin
          </button>
        </div>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            id="email"
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            type="email" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            type="password" 
            required 
            minLength={4} 
          />
        </div>

        <button className="auth-btn" type="submit">Login</button>
        {error && (
          <div className="auth-error">
            {error.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}
      </form>

      <div className="auth-links">
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
};

export default Login;
