import React, { createContext, useState } from "react";

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

  const login = (email, password) => {
    // For demo: check localStorage users
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.email === userData.email)) {
      return { success: false, message: "Email already exists" };
    }
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
