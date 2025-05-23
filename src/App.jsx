import "./styles/admin-panel.css";
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
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.pathname.startsWith("/admin"));

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      const isAdmin = window.location.pathname.startsWith("/admin");
      setIsAdminRoute(isAdmin);
      if (isAdmin) {
        document.body.classList.add("admin-panel-active");
      } else {
        document.body.classList.remove("admin-panel-active");
      }
    };
    handleRouteChange();
    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("pushstate", handleRouteChange);
    window.addEventListener("replacestate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("pushstate", handleRouteChange);
      window.removeEventListener("replacestate", handleRouteChange);
    };
  }, []);

  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              {/* Hide Header and Footer for all /admin routes */}
              {!isAdminRoute && <Header />}
              {/* Hide Sidebar for non-admin routes */}
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
                  <Route path="/account" element={
                    <ProtectedRoute role="user">
                      <Account />
                    </ProtectedRoute>
                  } />
                  <Route path="/checkout" element={
                    <ProtectedRoute role="user">
                      <Checkout />
                    </ProtectedRoute>
                  } />
                  <Route path="/wishlist" element={
                    <ProtectedRoute role="user">
                      <Wishlist />
                    </ProtectedRoute>
                  } />
                  <Route path="/category" element={<Category products={products} />} />
                  <Route path="/admin" element={
                    <ProtectedRoute role="admin">
                      <AdminPanel />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              )}
              {!isAdminRoute && <Footer />}
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
