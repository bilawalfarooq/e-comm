import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

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
  const [users] = useState(DUMMY_USERS);
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const [orders] = useState(DUMMY_ORDERS);
  const [newProduct, setNewProduct] = useState({ title: "", price: "", stock: "" });

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
    <div className="container admin-panel-container">
      <h2>Admin Panel</h2>
      {/* Product Stock Bar Chart */}
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
      <h3>Users</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Product Management</h3>
      <form className="admin-form" onSubmit={handleAddProduct}>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={handleProductChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleProductChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleProductChange}
          required
        />
        <button type="submit" className="add-to-cart-btn">Add Product</button>
      </form>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button className="remove-btn" onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Order Management</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
