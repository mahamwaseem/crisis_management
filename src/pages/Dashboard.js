import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";
import UserInfo from "./UserInfo";
import axios from "../api/axiosConfig";
import "../styles/Dashboard.css";

const CitizenDashboard = () => {
  const [user, setUser] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navigate = useNavigate();

  // User profile fetch
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="citizen-dashboard">
     
      <header className="dashboard-header">
        <div className="header-container">
          <div className="header-content">
            <h1 className="header-title">Citizen Portal</h1>
            <div className="header-actions">
              <Bell className="notification-bell" size={20} />
              {user && (
                <div className="user-info">
                  <div className="user-avatar">
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="user-name">{user.name}</span>
                </div>
              )}
              <button
                className="logout-btn"
                onClick={() => setShowLogoutConfirm(true)}
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      
      {showLogoutConfirm && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to logout?</p>
            <div className="logout-actions">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button onClick={handleLogout} className="confirm-btn">
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      
      <div className="navigation-tabs">
        <div className="tabs-container">
          <div className="tabs-list">
            <Link to="/dashboard" className="tab-button">
              Dashboard
            </Link>
            <Link to="/myreports" className="tab-button">
              My Reports
            </Link>
            <Link to="/newreport" className="tab-button">
              File New Report
            </Link>
           
          </div>
        </div>
      </div>

      
      <main className="main-content">
        <div className="dashboard-content">
          {user ? <UserInfo user={user} /> : <p>Loading user info...</p>}
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;
