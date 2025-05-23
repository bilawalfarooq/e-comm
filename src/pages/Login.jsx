import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.email.match(/^\S+@\S+\.\S+$/) || form.password.length < 4) {
      setError("Please enter valid credentials.");
      return;
    }
    const res = login(form.email, form.password);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="container auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required minLength={4} />
        <button className="auth-btn" type="submit">Login</button>
        {error && <div className="checkout-error">{error}</div>}
      </form>
      <div style={{ marginTop: 12 }}>
        Don't have an account? <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
};

export default Login;
