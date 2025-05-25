import React, { createContext, useState } from "react";
import { apiRequest } from "../api";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  React.useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const data = await apiRequest("/wishlist", { token });
        setWishlist(data.wishlist || []);
      } catch (err) {
        setWishlist([]);
      }
    };
    fetchWishlist();
  }, []);

  const addToWishlist = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await apiRequest("/wishlist/add", {
        method: "POST",
        body: { productId: product.id },
        token,
      });
      setWishlist((prev) => {
        if (prev.find((item) => item.id === product.id)) return prev;
        return [...prev, product];
      });
    } catch (err) {}
  };

  const removeFromWishlist = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await apiRequest("/wishlist/remove", {
        method: "POST",
        body: { productId: id },
        token,
      });
      setWishlist((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {}
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
