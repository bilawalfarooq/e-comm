import React, { useState, useContext } from "react";
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
import { AuthContext } from "../context/AuthContext";

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
  const { user, token } = useContext(AuthContext);
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
              <div className="dashboard-widgets" style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
                <div className="dashboard-widget" style={{ flex: 1, background: '#f5f7fa', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001' }}>
                  <h4>Products</h4>
                  <div style={{ fontSize: 32, fontWeight: 700 }}>{products.length}</div>
                  <div style={{ color: '#888' }}>Total Products</div>
                </div>
                <div className="dashboard-widget" style={{ flex: 1, background: '#f5f7fa', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001' }}>
                  <h4>Sales</h4>
                  <div style={{ fontSize: 32, fontWeight: 700 }}>$
                    {orders.reduce((sum, o) => sum + (o.total || 0), 0).toLocaleString()}
                  </div>
                  <div style={{ color: '#888' }}>Total Sales</div>
                </div>
                <div className="dashboard-widget" style={{ flex: 1, background: '#f5f7fa', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001' }}>
                  <h4>Users</h4>
                  <div style={{ fontSize: 32, fontWeight: 700 }}>{users.length}</div>
                  <div style={{ color: '#888' }}>Registered Users</div>
                </div>
                <div className="dashboard-widget" style={{ flex: 1, background: '#f5f7fa', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001' }}>
                  <h4>Orders</h4>
                  <div style={{ fontSize: 32, fontWeight: 700 }}>{orders.length}</div>
                  <div style={{ color: '#888' }}>Total Orders</div>
                </div>
                {/* New Widgets */}
                <div className="dashboard-widget" style={{ flex: 1, background: '#e3fcec', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001' }}>
                  <h4>New Users (30d)</h4>
                  <div style={{ fontSize: 32, fontWeight: 700 }}>{users.filter(u => u.createdAt && new Date(u.createdAt) > new Date(Date.now() - 30*24*60*60*1000)).length || 1}</div>
                  <div style={{ color: '#888' }}>Joined Last 30 Days</div>
                </div>
                <div className="dashboard-widget" style={{ flex: 1, background: '#fff3cd', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001' }}>
                  <h4>Out of Stock</h4>
                  <div style={{ fontSize: 32, fontWeight: 700 }}>{products.filter(p => p.stock === 0).length}</div>
                  <div style={{ color: '#888' }}>Products Out of Stock</div>
                </div>
                <div className="dashboard-widget" style={{ flex: 1, background: '#fce4ec', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001' }}>
                  <h4>Pending Orders</h4>
                  <div style={{ fontSize: 32, fontWeight: 700 }}>{orders.filter(o => o.status && o.status.toLowerCase() === 'pending').length}</div>
                  <div style={{ color: '#888' }}>Orders Pending</div>
                </div>
                <div className="dashboard-widget" style={{ flex: 1, background: '#e3e7fc', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001' }}>
                  <h4>Top Product</h4>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>
                    {/* Dummy logic: first product */}
                    {products[0]?.title || 'N/A'}
                  </div>
                  <div style={{ color: '#888' }}>Most Sold</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                <div style={{ flex: 2, minWidth: 320 }}>
                  <h3>Sales Overview</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={orders.map((o, i) => ({ name: `Order #${o.id}`, Sales: o.total }))} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" height={60} />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Sales" fill="#28a745" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, minWidth: 320 }}>
                  <h3>Product Stock</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={products.map((p) => ({ name: p.title, Stock: p.stock }))} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" height={60} />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Stock" fill="#007bff" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
          {section === "products" && <ProductsAdmin token={token} />}
          {section === "categories" && <CategoriesAdmin token={token} />}
          {section === "orders" && <OrdersAdmin token={token} />}
          {section === "invoice" && <InvoiceAdmin token={token} />}
          {section === "users" && <UsersAdmin token={token} users={users} />}
          {section === "inventory" && <InventoryAdmin token={token} />}
          {section === "analytics" && <AnalyticsAdmin token={token} />}
          {section === "settings" && <SettingsAdmin token={token} />}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
