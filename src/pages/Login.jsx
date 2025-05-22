import React, { useState } from "react";
import "../styles/App.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container auth-container">
      <h2>Login</h2>
      {submitted ? (
        <div className="auth-success">Login successful! (Demo only)</div>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-btn">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
