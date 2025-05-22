import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/App.css";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Category from "./pages/Category";
import { CartProvider, CartContext } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastProvider } from "./context/CartContext";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Header />
            {loading ? (
              <div className="container">Loading products...</div>
            ) : (
              <Routes>
                <Route path="/" element={<Home products={products} />} />
                <Route path="/products" element={<Products products={products} />} />
                <Route path="/product/:id" element={<ProductDetail products={products} />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/account" element={<Account />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/category" element={<Category products={products} />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
            <Footer />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
};

export default App;
