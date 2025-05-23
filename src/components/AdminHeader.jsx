import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowMenu(false);
  };

  return (
    <header className="admin-header">
      <div className="admin-header__content">
        <div className="admin-header__left">
          <span className="admin-header__logo">ShopEase</span>
          <button
            className="admin-header__collapse-btn"
            onClick={() => setCollapsed((c) => !c)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <span>&#9776;</span> : <span>&#10005;</span>}
          </button>
        </div>
        <div className="admin-header__account">
          <button className="admin-user-btn" onClick={() => setShowMenu((v) => !v)} aria-label="Admin menu">
            <span className="admin-avatar">{user?.name?.charAt(0).toUpperCase()}</span>
            <span>{user?.name}</span>
          </button>
          {showMenu && (
            <div className="admin-user-dropdown" tabIndex={0} onBlur={() => setShowMenu(false)}>
              <div className="admin-user-dropdown-header">
                <strong>{user?.name}</strong>
                <small>{user?.email}</small>
              </div>
              <div className="admin-user-dropdown-content">
                <button className="admin-account-btn" onClick={() => { setShowMenu(false); navigate("/account"); }}>Account Management</button>
                <button className="admin-logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
