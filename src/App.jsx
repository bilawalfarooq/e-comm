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
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
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
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <Router>
              <Header />
              {loading ? (
                <div className="container">Loading products...</div>
              ) : (
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home products={products} />} />
                  <Route path="/products" element={<Products products={products} />} />
                  <Route path="/product/:id" element={<ProductDetail products={products} />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/category/:category" element={<Category products={products} />} />

                  {/* Protected Routes */}
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/account"
                    element={
                      <ProtectedRoute>
                        <Account />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/wishlist"
                    element={
                      <ProtectedRoute>
                        <Wishlist />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminPanel />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              )}
              <Footer />
            </Router>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
