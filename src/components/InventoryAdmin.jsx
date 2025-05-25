import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

const InventoryAdmin = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState({}); // { [productId]: variantIndex }
  const [stock, setStock] = useState({}); // { [`${productId}_${variantIdx}`]: value }

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/products", { token });
      setProducts(data.products || data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [token]);

  // Start editing stock for a product variant
  const handleEdit = (productId, variantIdx, currentStock) => {
    setEditing({ productId, variantIdx });
    setStock({ [`${productId}_${variantIdx}`]: currentStock });
  };

  // Save updated stock for a variant
  const handleSave = async (product, variantIdx) => {
    try {
      const updatedVariants = [...(product.variants || [])];
      updatedVariants[variantIdx].stock = Number(stock[`${product._id}_${variantIdx}`]);
      await apiRequest(`/products/${product._id}`, {
        method: "PUT",
        token,
        body: { variants: updatedVariants },
      });
      setEditing({});
      setStock({});
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Inventory Management</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table border="1" cellPadding="6" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Variant</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.flatMap((p) =>
              (p.variants && p.variants.length > 0
                ? p.variants.map((v, idx) => (
                    <tr key={`${p._id}_${idx}`}>
                      <td>{p.name}</td>
                      <td>{`${v.size || ""} ${v.color || ""}`.trim() || "-"}</td>
                      <td>
                        {editing.productId === p._id && editing.variantIdx === idx ? (
                          <input
                            type="number"
                            value={stock[`${p._id}_${idx}`]}
                            onChange={e => setStock(s => ({ ...s, [`${p._id}_${idx}`]: e.target.value }))}
                            style={{ width: 60 }}
                          />
                        ) : (
                          v.stock
                        )}
                      </td>
                      <td>
                        {editing.productId === p._id && editing.variantIdx === idx ? (
                          <>
                            <button onClick={() => handleSave(p, idx)}>Save</button>
                            <button onClick={() => setEditing({})}>Cancel</button>
                          </>
                        ) : (
                          <button onClick={() => handleEdit(p._id, idx, v.stock)}>Edit</button>
                        )}
                      </td>
                    </tr>
                  ))
                : [
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>-</td>
                    <td>0</td>
                    <td></td>
                  </tr>
                ])
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryAdmin;
