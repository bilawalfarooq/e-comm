import React, { useContext } from "react";

const Account = () => {
  // Demo order history
  const orders = [
    {
      id: 1,
      date: "2025-05-10",
      total: 1098,
      items: [
        { id: 1, title: "iPhone 9", price: 549, quantity: 1 },
        { id: 2, title: "Samsung Galaxy", price: 549, quantity: 1 },
      ],
    },
    {
      id: 2,
      date: "2025-04-22",
      total: 549,
      items: [
        { id: 3, title: "MacBook Pro", price: 549, quantity: 1 },
      ],
    },
  ];

  return (
    <div className="container account-container">
      <h2>My Account</h2>
      <p>Account details and order history will appear here. (Demo only)</p>
      <h3>Order History</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="order-history">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <span>Order #{order.id}</span>
                <span>Date: {order.date}</span>
                <span>Total: ${order.total}</span>
              </div>
              <ul className="order-items">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.title} (x{item.quantity}) - ${item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Account;
