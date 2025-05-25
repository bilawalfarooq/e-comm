import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

const OrdersAdmin = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusUpdate, setStatusUpdate] = useState({});

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/orders", { token });
      setOrders(data.orders || data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    try {
      const data = await apiRequest("/users", { token });
      setUsers(data.users || data);
    } catch (err) {
      /* ignore */
    }
  };

  useEffect(() => { fetchOrders(); fetchUsers(); }, [token]);

  const handleStatusChange = (orderId, status) => {
    setStatusUpdate(prev => ({ ...prev, [orderId]: status }));
  };

  const updateOrderStatus = async (orderId) => {
    try {
      await apiRequest(`/orders/${orderId}/status`, {
        method: "PUT",
        token,
        body: { status: statusUpdate[orderId] },
      });
      fetchOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  // Map userId to user info
  const userMap = users.reduce((map, u) => { map[u._id] = u; return map; }, {});

  return (
    <div>
      <h2>Orders Management</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table border="1" cellPadding="6" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  {userMap[order.userId]?.name || order.userId}<br/>
                  <span style={{ color: '#888', fontSize: 12 }}>{userMap[order.userId]?.email}</span>
                </td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => window.open(`/api/orders/${order._id}/invoice?token=${token}`, '_blank')}>Download Invoice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersAdmin;
