import React, { useState } from "react";
import ProductsAdmin from "./ProductsAdmin";
import OrdersAdmin from "./OrdersAdmin";
import CouponsAdmin from "./CouponsAdmin";
import UsersAdmin from "./UsersAdmin";
import CategoriesAdmin from "./CategoriesAdmin";
import AnalyticsAdmin from "./AnalyticsAdmin";
import InvoiceAdmin from "./InvoiceAdmin";
import SettingsAdmin from "./SettingsAdmin";
import AdminSidebar from "./AdminSidebar";
import ActivityLogAdmin from "./ActivityLogAdmin";

const AdminPanel = ({ token }) => {
  const [tab, setTab] = useState("products");
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar tab={tab} setTab={setTab} />
      <main style={{ flex: 1, padding: 24 }}>
        {tab === "products" && <ProductsAdmin token={token} />}
        {tab === "orders" && <OrdersAdmin token={token} />}
        {tab === "coupons" && <CouponsAdmin token={token} />}
        {tab === "users" && <UsersAdmin token={token} />}
        {tab === "categories" && <CategoriesAdmin token={token} />}
        {tab === "analytics" && <AnalyticsAdmin />}
        {tab === "invoices" && <InvoiceAdmin />}
        {tab === "settings" && <SettingsAdmin />}
        {tab === "activity" && <ActivityLogAdmin token={token} />}
      </main>
    </div>
  );
};

export default AdminPanel;
