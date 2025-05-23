import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import ProductsAdmin from "../components/ProductsAdmin";
import CategoriesAdmin from "../components/CategoriesAdmin";
import OrdersAdmin from "../components/OrdersAdmin";
import InvoiceAdmin from "../components/InvoiceAdmin";
import UsersAdmin from "../components/UsersAdmin";
import InventoryAdmin from "../components/InventoryAdmin";
import AnalyticsAdmin from "../components/AnalyticsAdmin";
import SettingsAdmin from "../components/SettingsAdmin";

const DUMMY_USERS = [
  { id: 1, name: "Admin", email: "admin@shopease.com", role: "admin" },
  { id: 2, name: "User", email: "user@shopease.com", role: "user" },
];

const DUMMY_PRODUCTS = [
  { id: 1, title: "iPhone 9", price: 549, stock: 10 },
  { id: 2, title: "Samsung Galaxy", price: 499, stock: 7 },
];

const DUMMY_ORDERS = [
  { id: 1, user: "User", total: 549, status: "Delivered" },
  { id: 2, user: "User", total: 499, status: "Pending" },
];

const AdminPanel = () => {
  const [section, setSection] = useState("dashboard");
  const [users] = useState(DUMMY_USERS);
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const [orders] = useState(DUMMY_ORDERS);
  const [newProduct, setNewProduct] = useState({ title: "", price: "", stock: "" });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Track sidebar collapsed state in AdminPanel

  const handleProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts([
      ...products,
      { ...newProduct, id: Date.now(), price: Number(newProduct.price), stock: Number(newProduct.stock) },
    ]);
    setNewProduct({ title: "", price: "", stock: "" });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Prepare data for the chart (e.g., product stock visualization)
  const chartData = products.map((p) => ({ name: p.title, Stock: p.stock }));

  return (
    <div className="admin-panel-root">
      {/* Pass collapsed and setCollapsed to both header and sidebar */}
      <AdminHeader collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="admin-panel-layout">
        <AdminSidebar section={section} setSection={setSection} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <main className="admin-panel-main glass-card" style={{ marginLeft: sidebarCollapsed ? 60 : 220, transition: 'margin-left 0.2s' }}>
          {section === "dashboard" && (
            <>
              <h2>Dashboard</h2>
              <div style={{ width: "100%", height: 320, marginBottom: 32 }}>
                <h3>Product Stock Overview</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" height={60} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Stock" fill="#007bff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
          {section === "products" && <ProductsAdmin />}
          {section === "categories" && <CategoriesAdmin />}
          {section === "orders" && <OrdersAdmin />}
          {section === "invoice" && <InvoiceAdmin />}
          {section === "users" && <UsersAdmin users={users} />}
          {section === "inventory" && <InventoryAdmin />}
          {section === "analytics" && <AnalyticsAdmin />}
          {section === "settings" && <SettingsAdmin />}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
