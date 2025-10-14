import React, { useState, useEffect } from "react";
import { Bell, LogOut, FileText, CheckCircle, Clock, XCircle, AlertCircle, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
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
    pendingReports: 0
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
    fetchUser();
  }, []);

  useEffect(() => {
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
    { name: "Pending", value: stats.pendingReports, color: "#ef4444" }
  ];

  const overviewData = [
    { name: "Reports", value: stats.totalReports, color: "#3b82f6" }
  ];

  return (
    <div className="citizen-dashboard">
      <header className="dashboard-header">
        <div className="header-container">
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

      <main className="main-content">
        <div className="dashboard-content">
          {user ? <UserInfo user={user} /> : <p>Loading user info...</p>}

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px', 
            marginTop: '30px' 
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              padding: '25px',
              borderRadius: '12px',
              color: 'white',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>Total Reports</p>
                  <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0 0 0' }}>
                    {stats.totalReports}
                  </h2>
                </div>
                <FileText size={40} style={{ opacity: 0.8 }} />
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              padding: '25px',
              borderRadius: '12px',
              color: 'white',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>Resolved</p>
                  <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0 0 0' }}>
                    {stats.resolvedReports}
                  </h2>
                </div>
                <CheckCircle size={40} style={{ opacity: 0.8 }} />
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              padding: '25px',
              borderRadius: '12px',
              color: 'white',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>In Progress</p>
                  <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0 0 0' }}>
                    {stats.inProgressReports}
                  </h2>
                </div>
                <Clock size={40} style={{ opacity: 0.8 }} />
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              padding: '25px',
              borderRadius: '12px',
              color: 'white',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>Closed</p>
                  <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0 0 0' }}>
                    {stats.closedReports}
                  </h2>
                </div>
                <XCircle size={40} style={{ opacity: 0.8 }} />
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              padding: '25px',
              borderRadius: '12px',
              color: 'white',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>Pending</p>
                  <h2 style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0 0 0' }}>
                    {stats.pendingReports}
                  </h2>
                </div>
                <AlertCircle size={40} style={{ opacity: 0.8 }} />
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '25px', 
            marginTop: '30px' 
          }}>
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1f2937' }}>
                Reports Status Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={reportStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
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

            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1f2937' }}>
                System Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={overviewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {overviewData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginTop: '25px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingUp size={24} color="#10b981" />
              Performance Summary
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ textAlign: 'center', padding: '15px' }}>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>Resolution Rate</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>
                  {stats.totalReports > 0 ? Math.round((stats.resolvedReports / stats.totalReports) * 100) : 0}%
                </p>
              </div>
              <div style={{ textAlign: 'center', padding: '15px' }}>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>Active Cases</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>
                  {stats.inProgressReports + stats.pendingReports}
                </p>
              </div>
              <div style={{ textAlign: 'center', padding: '15px' }}>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>Completed</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#6366f1' }}>
                  {stats.resolvedReports + stats.closedReports}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
