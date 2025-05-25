import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

const CouponsAdmin = ({ token }) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ code: "", discountType: "percentage", discountValue: 0, expiryDate: "", usageLimit: 1 });
  const [editing, setEditing] = useState(null);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/coupons", { token });
      setCoupons(data.coupons || data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editing) {
        await apiRequest(`/coupons/${editing._id}`, { method: "PUT", token, body: form });
      } else {
        await apiRequest("/coupons", { method: "POST", token, body: form });
      }
      setForm({ code: "", discountType: "percentage", discountValue: 0, expiryDate: "", usageLimit: 1 });
      setEditing(null);
      fetchCoupons();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = coupon => {
    setEditing(coupon);
    setForm({ ...coupon });
  };

  const handleDelete = async id => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      await apiRequest(`/coupons/${id}`, { method: "DELETE", token });
      fetchCoupons();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Coupons Management</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input placeholder="Code" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} required />
        <select value={form.discountType} onChange={e => setForm(f => ({ ...f, discountType: e.target.value }))}>
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
        <input placeholder="Discount Value" type="number" value={form.discountValue} onChange={e => setForm(f => ({ ...f, discountValue: e.target.value }))} required />
        <input placeholder="Expiry Date" type="date" value={form.expiryDate} onChange={e => setForm(f => ({ ...f, expiryDate: e.target.value }))} required />
        <input placeholder="Usage Limit" type="number" value={form.usageLimit} onChange={e => setForm(f => ({ ...f, usageLimit: e.target.value }))} required />
        <button type="submit">{editing ? "Update" : "Create"} Coupon</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ code: "", discountType: "percentage", discountValue: 0, expiryDate: "", usageLimit: 1 }); }}>Cancel</button>}
      </form>
      {loading ? <div>Loading...</div> : (
        <table border="1" cellPadding="6" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Code</th><th>Type</th><th>Value</th><th>Expiry</th><th>Usage</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c._id}>
                <td>{c.code}</td>
                <td>{c.discountType}</td>
                <td>{c.discountValue}</td>
                <td>{c.expiryDate && c.expiryDate.slice(0,10)}</td>
                <td>{c.usageLimit}</td>
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

export default CouponsAdmin;
