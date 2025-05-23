import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Usage: <ProtectedRoute role="admin">...</ProtectedRoute>
const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (role && user.role !== role) {
    // User does not have the required role
    // Redirect admin to /admin, user to /account, fallback to home
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'user') return <Navigate to="/account" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
