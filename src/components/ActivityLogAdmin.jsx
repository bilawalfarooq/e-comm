import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

const ActivityLogAdmin = ({ token }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const data = await apiRequest("/admin/logs", { token });
        setLogs(data.logs || data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchLogs();
  }, [token]);

  return (
    <div>
      <h2>Activity Log</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading ? <div>Loading...</div> : (
        <table border="1" cellPadding="6" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Action</th><th>Performed By</th><th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log._id}>
                <td>{log.action}</td>
                <td>{log.performedBy}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActivityLogAdmin;
