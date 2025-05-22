import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();
export const ToastContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const decrementFromCart = (id) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      if (item.quantity === 1) {
        return prev.filter((i) => i.id !== id);
      }
      return prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decrementFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}
    </ToastContext.Provider>
  );
};
