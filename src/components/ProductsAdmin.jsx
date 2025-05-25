import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

const ProductsAdmin = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", price: "", description: "", images: [""], category: "", variants: [{ size: "", color: "", stock: 0 }] });
  const [editing, setEditing] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/products", { token });
      setProducts(data.products || data); // handle both array and {products: []}
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Fetch categories for dropdown
  const fetchCategories = async () => {
    try {
      const data = await apiRequest("/categories", { token });
      setCategories(data.categories || data);
    } catch (err) {
      setCategories([]);
    }
  };

  useEffect(() => { fetchProducts(); }, []);
  useEffect(() => { fetchCategories(); }, [token]);

  // Create or update product
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editing) {
        await apiRequest(`/products/${editing._id}`, { method: "PUT", token, body: form });
      } else {
        await apiRequest("/products", { method: "POST", token, body: form });
      }
      setForm({ name: "", price: "", description: "", images: [""], category: "", variants: [{ size: "", color: "", stock: 0 }] });
      setEditing(null);
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit product
  const handleEdit = product => {
    setEditing(product);
    setForm({ ...product });
  };

  // Delete product
  const handleDelete = async id => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await apiRequest(`/products/${id}`, { method: "DELETE", token });
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Products Management</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        <input placeholder="Price" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
        <input placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
        <input placeholder="Image URL" value={form.images[0]} onChange={e => setForm(f => ({ ...f, images: [e.target.value] }))} required />
        <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <input placeholder="Variant Size" value={form.variants[0].size} onChange={e => setForm(f => ({ ...f, variants: [{ ...f.variants[0], size: e.target.value }] }))} />
        <input placeholder="Variant Color" value={form.variants[0].color} onChange={e => setForm(f => ({ ...f, variants: [{ ...f.variants[0], color: e.target.value }] }))} />
        <input placeholder="Variant Stock" type="number" value={form.variants[0].stock} onChange={e => setForm(f => ({ ...f, variants: [{ ...f.variants[0], stock: Number(e.target.value) }] }))} />
        <button type="submit">{editing ? "Update" : "Create"} Product</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: "", price: "", description: "", images: [""], category: "", variants: [{ size: "", color: "", stock: 0 }] }); }}>Cancel</button>}
      </form>
      {loading ? <div>Loading...</div> : (
        <table border="1" cellPadding="6" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th><th>Price</th><th>Description</th><th>Category</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.description}</td>
                <td>{categories.find(cat => cat._id === p.category)?.name || p.category}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsAdmin;
