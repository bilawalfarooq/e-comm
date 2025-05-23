import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

// Demo user accounts
const demoAccounts = {
  user: {
    id: 1,
    name: "Demo User",
    email: "user@demo.com",
    password: "user123",
    role: "user",
  },
  admin: {
    id: 2,
    name: "Demo Admin",
    email: "admin@demo.com",
    password: "admin123",
    role: "admin",
  },
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved auth state on component mount
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Check demo accounts
    const demoUser = Object.values(demoAccounts).find(
      (account) => account.email === email && account.password === password
    );

    if (demoUser) {
      const { password: _, ...userWithoutPassword } = demoUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return { success: true };
    }

    return {
      success: false,
      message:
        "Invalid credentials. Try demo accounts:\nUser: user@demo.com / user123\nAdmin: admin@demo.com / admin123",
    };
  };

  const signup = ({ name, email, password }) => {
    // Check if email already exists in demo accounts
    if (Object.values(demoAccounts).some((account) => account.email === email)) {
      return { success: false, message: "Email already exists" };
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      role: "user",
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        signup,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
