import React, { createContext, useState } from "react";
import API_BASE_URL, { apiRequest } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Demo accounts: one admin, one user
  React.useEffect(() => {
    const demoUsers = [
      { name: "Admin", email: "admin@shopease.com", password: "admin123", role: "admin" },
      { name: "Demo User", email: "user@shopease.com", password: "user123", role: "user" }
    ];
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    demoUsers.forEach(demo => {
      if (!users.find(u => u.email === demo.email)) {
        users.push(demo);
      }
    });
    localStorage.setItem("users", JSON.stringify(users));
  }, []);

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const login = async (email, password) => {
    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: { email, password },
      });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const signup = async (userData) => {
    try {
      const data = await apiRequest("/auth/signup", {
        method: "POST",
        body: userData,
      });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
