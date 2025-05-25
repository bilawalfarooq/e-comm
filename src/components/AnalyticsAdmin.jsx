import React, { useEffect, useState, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { apiRequest } from "../api";
import { AuthContext } from "../context/AuthContext";

const COLORS = ["#28a745", "#ffc107", "#dc3545", "#007bff", "#6f42c1"];

const AnalyticsAdmin = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await apiRequest("/orders/analytics", { token });
        setAnalytics(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchAnalytics();
  }, [token]);

  if (loading) return <div>Loading analytics...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!analytics || !analytics.revenueTrends)
    return <div style={{ color: "red" }}>No analytics data available. (Debug: {JSON.stringify(analytics)})</div>;

  // Format data for charts
  const revenueTrends = analytics.revenueTrends.map((rt) => ({
    month: `${rt.year}-${String(rt.month).padStart(2, "0")}`,
    revenue: rt.revenue,
  }));
  const conversionRates = analytics.conversionRates.map((rt) => ({
    month: rt.month,
    rate: Number(rt.rate),
  }));
  const topCustomers = analytics.topCustomers;
  const avgOrderValue = analytics.avgOrderValue;

  return (
    <div>
      <h2>Analytics</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
        <div style={{ flex: 2, minWidth: 320 }}>
          <h3>Revenue Trends</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={revenueTrends}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#007bff"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          <h3>Conversion Rate</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={conversionRates}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 5]} tickFormatter={(v) => v + "%"} />
              <Tooltip formatter={(v) => v + "%"} />
              <Legend />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#28a745"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          <h3>Average Order Value</h3>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              margin: "32px 0",
              color: "#007bff",
            }}
          >
            ${avgOrderValue}
          </div>
          <div style={{ color: "#888" }}>
            Avg. Order Value (last 6 months)
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          <h3>Top Customers</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {topCustomers.map((c, i) => (
              <li
                key={c.name}
                style={{
                  marginBottom: 12,
                  background: "#f5f7fa",
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <strong>
                  {i + 1}. {c.name}
                </strong>
                <br />
                Orders: {c.orders || c.orderCount} <br />
                Revenue: ${c.revenue}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 2, minWidth: 320 }}>
          <h3>Sales by Month</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={revenueTrends}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Top Categories - only if available from backend */}
        {analytics.topCategories ? (
          <div style={{ flex: 1, minWidth: 320 }}>
            <h3>Top Categories</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={analytics.topCategories}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {analytics.topCategories.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : null}
        {/* User Registrations - only if available from backend */}
        {analytics.userRegistrations ? (
          <div style={{ flex: 1, minWidth: 320 }}>
            <h3>User Registrations</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={analytics.userRegistrations}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#28a745" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : null}
        {/* Order Status - only if available from backend */}
        {analytics.orderStatus ? (
          <div style={{ flex: 1, minWidth: 320 }}>
            <h3>Order Status</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={analytics.orderStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {analytics.orderStatus.map((entry, idx) => (
                    <Cell key={`cell-status-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AnalyticsAdmin;
