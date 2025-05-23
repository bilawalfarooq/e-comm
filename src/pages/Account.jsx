import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Demo order history
  const orders = [
    {
      id: 1,
      date: "2025-05-10",
      total: 1098,
      status: "Delivered",
      items: [
        { id: 1, title: "iPhone 9", price: 549, quantity: 1 },
        { id: 2, title: "Samsung Galaxy", price: 549, quantity: 1 },
      ],
    },
    {
      id: 2,
      date: "2025-04-22",
      total: 549,
      status: "In Transit",
      items: [
        { id: 3, title: "MacBook Pro", price: 549, quantity: 1 },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container account-container">
      <div className="account-header">
        <div className="profile-section">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p className="user-role">Role: {user.role}</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="16 17 21 12 16 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="21" y1="12" x2="9" y2="12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Logout
          </button>
        </div>
      </div>

      <div className="account-content">
        <div className="account-section">
          <h3>Recent Orders</h3>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <div className="order-history">
              {orders.map((order) => (
                <div className="order-card" key={order.id}>
                  <div className="order-header">
                    <div className="order-info">
                      <h4>Order #{order.id}</h4>
                      <span className="order-date">{order.date}</span>
                    </div>
                    <span className={`order-status status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-items">
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item">
                        <span>{item.title} × {item.quantity}</span>
                        <span>${item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-footer">
                    <span className="order-total">Total: ${order.total}</span>
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {user.role === 'admin' && (
          <div className="account-section">
            <h3>Admin Actions</h3>
            <div className="admin-actions">
              <button onClick={() => navigate('/admin')} className="admin-btn">
                Go to Admin Panel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
