import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bell, LogOut, FileText, Layout, FileSpreadsheet, FilePlus } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import UserInfo from "./UserInfo";
import axios from "../api/axiosConfig";
import "../styles/Dashboard.css";

const CitizenDashboard = () => {
  const [user, setUser] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("/report", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
        });
        setReports(Array.isArray(res.data) ? res.data : res.data.data || res.data.reports || []);
      } catch (err) {
        setError("Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
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
              <Layout size={18} />
              Dashboard
            </Link>
            <Link to="/myreports" className="tab-button">
              <FileSpreadsheet size={18} />
              My Reports
            </Link>
            <Link to="/newreport" className="tab-button">
              <FilePlus size={18} />
              File New Report
            </Link>
          </div>
        </div>
      </div>

      
      <main className="main-content">
        <div className="dashboard-content">
          {user ? <UserInfo user={user} /> : <p>Loading user info...</p>}
          
          {!loading && !error && (
            <div className="status-container">
              <div className="summary-heading">
                <h2>Report Status Overview</h2>
              </div>
              <div className="report-summary">
                <div className="summary-box total">
                  <h4>Total Reports</h4>
                  <p>{reports.length}</p>
                </div>
                <div className="summary-box resolved">
                  <h4>Resolved</h4>
                  <p>{reports.filter(r => r.status === "Resolved").length}</p>
                </div>
                <div className="summary-box pending">
                  <h4>Pending</h4>
                  <p>{reports.filter(r => r.status === "Pending").length}</p>
                </div>
                <div className="summary-box progress">
                  <h4>In Progress</h4>
                  <p>{reports.filter(r => r.status === "In Progress").length}</p>
                </div>
              </div>

              <div className="charts-container">
                <div className="chart-box">
                  <h3>Reports Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Resolved', value: reports.filter(r => r.status === "Resolved").length, color: '#16a34a' },
                          { name: 'In Progress', value: reports.filter(r => r.status === "In Progress").length, color: '#ca8a04' },
                          { name: 'Pending', value: reports.filter(r => r.status === "Pending").length, color: '#dc2626' }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {reports.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-box">
                  <h3>Reports by Category</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={Object.entries(
                        reports.reduce((acc, report) => {
                          acc[report.category] = (acc[report.category] || 0) + 1;
                          return acc;
                        }, {})
                      ).map(([category, count]) => ({
                        category,
                        count
                      }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8C1007" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;
