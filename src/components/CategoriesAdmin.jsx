import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

const CategoriesAdmin = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", description: "" });
  const [editing, setEditing] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/categories", { token });
      setCategories(data.categories || data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editing) {
        await apiRequest(`/categories/${editing._id}`, { method: "PUT", token, body: form });
      } else {
        await apiRequest("/categories", { method: "POST", token, body: form });
      }
      setForm({ name: "", description: "" });
      setEditing(null);
      fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = category => {
    setEditing(category);
    setForm({ ...category });
  };

  const handleDelete = async id => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await apiRequest(`/categories/${id}`, { method: "DELETE", token });
      fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Categories Management</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        <input placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
        <button type="submit">{editing ? "Update" : "Create"} Category</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: "", description: "" }); }}>Cancel</button>}
      </form>
      {loading ? <div>Loading...</div> : (
        <table border="1" cellPadding="6" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th><th>Description</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.description}</td>
                <td>
                  <button onClick={() => handleEdit(c)}>Edit</button>
                  <button onClick={() => handleDelete(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoriesAdmin;
