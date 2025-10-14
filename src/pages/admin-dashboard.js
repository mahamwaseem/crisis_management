import React, { useState, useEffect } from "react";
import {
  Bell,
  LogOut,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import UserInfo from "./UserInfo";
import axios from "../api/axiosConfig";
import "../styles/Dashboard.css";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [stats, setStats] = useState({
    totalReports: 0,
    resolvedReports: 0,
    inProgressReports: 0,
    closedReports: 0,
    pendingReports: 0,
  });

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

    const fetchStats = async () => {
      try {
        const res = await axios.get("/admin/analytics", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        const data = res.data.analytics || res.data;
        setStats({
          totalReports: data.totalReports || 0,
          resolvedReports: data.resolvedReports || 0,
          inProgressReports: data.inProgressReports || 0,
          closedReports: data.closedReports || 0,
          pendingReports: data.pendingReports || 0,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchUser();
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  const reportStatusData = [
    { name: "Resolved", value: stats.resolvedReports, color: "#10b981" },
    { name: "In Progress", value: stats.inProgressReports, color: "#f59e0b" },
    { name: "Closed", value: stats.closedReports, color: "#6366f1" },
    { name: "Pending", value: stats.pendingReports, color: "#ef4444" },
  ];

  return (
    <div className="admin-dashboard">
      {/* HEADER */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">Admin Portal</h1>
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
      </header>

      {/* LOGOUT CONFIRM MODAL */}
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

      {/* MAIN CONTENT */}
      <main className="main-content">
        <div className="dashboard-content">
          {/* 1️⃣ USER INFO */}
          {user ? <UserInfo user={user} /> : <p>Loading user info...</p>}

          {/* 2️⃣ STATUS CARDS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            {[
              {
                title: "Total Reports",
                value: stats.totalReports,
                color: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                icon: <FileText size={40} style={{ opacity: 0.8 }} />,
              },
              {
                title: "Resolved",
                value: stats.resolvedReports,
                color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                icon: <CheckCircle size={40} style={{ opacity: 0.8 }} />,
              },
              {
                title: "In Progress",
                value: stats.inProgressReports,
                color: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                icon: <Clock size={40} style={{ opacity: 0.8 }} />,
              },
              {
                title: "Closed",
                value: stats.closedReports,
                color: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                icon: <XCircle size={40} style={{ opacity: 0.8 }} />,
              },
              {
                title: "Pending",
                value: stats.pendingReports,
                color: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                icon: <AlertCircle size={40} style={{ opacity: 0.8 }} />,
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  background: card.color,
                  padding: "25px",
                  borderRadius: "12px",
                  color: "white",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  cursor: card.title === "Total Reports" ? "pointer" : "default",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onClick={() =>
                  card.title === "Total Reports" &&
                  (window.location.href = "/admin/reports")
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "14px", opacity: 0.9, margin: 0 }}>
                      {card.title}
                    </p>
                    <h2
                      style={{
                        fontSize: "36px",
                        fontWeight: "bold",
                        margin: "10px 0 0 0",
                      }}
                    >
                      {card.value}
                    </h2>
                  </div>
                  {card.icon}
                </div>
              </div>
            ))}
          </div>

          {/* 3️⃣ PIE CHART */}
          <div
            className="chart-card"
            style={{ marginTop: "40px", background: "#fff", borderRadius: "12px", padding: "1.5rem" }}
          >
            <h3 style={{ marginBottom: "1rem", color: "#1f2937" }}>
              Report Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {reportStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 4️⃣ BAR CHART */}
          <div
            className="chart-card"
            style={{ marginTop: "40px", background: "#fff", borderRadius: "12px", padding: "1.5rem" }}
          >
            <h3 style={{ marginBottom: "1rem", color: "#1f2937" }}>
              Reports Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={reportStatusData.map((r) => ({
                  name: r.name,
                  count: r.value,
                  color: r.color,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count">
                  {reportStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
