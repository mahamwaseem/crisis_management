import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Bell, LogOut } from 'lucide-react';
import UserInfo from './UserInfo';
import axios from "../api/axiosConfig"; 
import ReportStatus from '../myComponents/ReportStatus';
import NewReportForm from '../myComponents/NewReportForm';
import "../styles/Dashboard.css";


const CitizenDashboard = () => {
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
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
        setReports(Array.isArray(res.data) ? res.data : res.data.reports || []);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };
    fetchReports();
  }, []);

  const handleAddReport = (newReport) => {
    setReports((prev) => [...prev, newReport]);
    setActiveTab("reports");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/');
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
                    {user.name.split(' ').map(n => n[0]).join('')}
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
              <button onClick={() => setShowLogoutConfirm(false)} className="cancel-btn">
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
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`tab-button ${activeTab === 'dashboard' ? 'active' : 'inactive'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`tab-button ${activeTab === 'reports' ? 'active' : 'inactive'}`}
            >
              My Reports
            </button>
            <button
              onClick={() => setActiveTab('new-report')}
              className={`tab-button ${activeTab === 'new-report' ? 'active' : 'inactive'}`}
            >
              File New Report
            </button>
          </div>
        </div>
      </div>

      
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
           
            {user ? <UserInfo user={user} /> : <p>Loading user info...</p>}

            <div className="stats-grid">
              <div className="stat-card">
                <h3 className="stat-title">Total Reports</h3>
                <p className="stat-value total">{reports.length}</p>
              </div>
              <div className="stat-card">
                <h3 className="stat-title">Pending</h3>
                <p className="stat-value pending">
                  {reports.filter(r => r.status === 'Pending').length}
                </p>
              </div>
              <div className="stat-card">
                <h3 className="stat-title">Resolved</h3>
                <p className="stat-value resolved">
                  {reports.filter(r => r.status === 'Resolved').length}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && <ReportStatus reports={reports} />}
        {activeTab === 'new-report' && <NewReportForm onSubmitReport={handleAddReport} />}
      </main>
    </div>
  );
};

export default CitizenDashboard;
