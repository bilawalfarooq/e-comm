import React, { useState } from "react";

const icons = {
  dashboard: "🏠",
  products: "🛍️",
  categories: "📂",
  orders: "🧾",
  invoice: "🧾",
  users: "👤",
  inventory: "📦",
  analytics: "📊",
  settings: "⚙️",
};

const labels = {
  dashboard: "Dashboard",
  products: "Products",
  categories: "Categories",
  orders: "Orders",
  invoice: "Invoice",
  users: "Users",
  inventory: "Inventory",
  analytics: "Analytics",
  settings: "Settings",
};

const sections = [
  "dashboard",
  "products",
  "categories",
  "orders",
  "invoice",
  "users",
  "inventory",
  "analytics",
  "settings",
];

const AdminSidebar = ({ section, setSection, collapsed, setCollapsed }) => {
  return (
    <aside
      className={`admin-sidebar${collapsed ? " collapsed" : ""}`}
      style={{ top: 56, height: 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="admin-sidebar-nav" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          <nav>
            <ul className="admin-sidebar-list">
              {sections.map((sec) => (
                <li
                  key={sec}
                  className={`admin-sidebar-item${collapsed ? " collapsed" : ""}${section === sec ? " active" : ""}`}
                  onClick={() => setSection(sec)}
                  title={labels[sec]}
                >
                  <span className={`admin-sidebar-icon admin-sidebar-icon--${sec}`}>
                    {icons[sec]}
                  </span>
                  {!collapsed && <span>{labels[sec]}</span>}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className={`admin-sidebar-bottom${collapsed ? " collapsed" : ""}`} style={{ flexShrink: 0 }}>
        {collapsed ? "©" : "© 2025 ShopEase Admin"}
      </div>
    </aside>
  );
};

export default AdminSidebar;

// In AdminPanel.jsx, add left margin to main content:
// In the main content wrapper (e.g., .admin-panel-layout or main), add:
// style={{ marginLeft: collapsed ? 60 : 220, transition: 'margin-left 0.2s' }}

// Basic structure for each section in AdminPanel.jsx:
const AdminPanel = ({ section }) => {
  return (
    <div style={{ padding: 24 }}>
      {section === "dashboard" && <div>Dashboard Placeholder</div>}
      {section === "products" && <div>Products Placeholder</div>}
      {section === "categories" && <div>Categories Placeholder</div>}
      {section === "orders" && <div>Orders Placeholder</div>}
      {section === "invoice" && <div>Invoice Placeholder</div>}
      {section === "users" && <div>Users Placeholder</div>}
      {section === "inventory" && <div>Inventory Placeholder</div>}
      {section === "analytics" && <div>Analytics Placeholder</div>}
      {section === "settings" && <div>Settings Placeholder</div>}
    </div>
  );
};
