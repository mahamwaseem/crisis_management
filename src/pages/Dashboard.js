import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import UserInfo from './UserInfo';
import ReportStatus from '../myComponents/ReportStatus';
import NewReportForm from '../myComponents/NewReportForm';
import "../styles/Dashboard.css";

// Mock data
const mockUser = {
  id: 'CIT001',
  name: 'Maham Waseem',
  email: 'maham.waseem@email.com',
  phone: '+92-300-1234567',
  address: 'Street 15, F-7 Markaz, Islamabad',
  cnic: '12345-6789012-3',
  memberSince: '2025-01-15'
};

const mockReports = [
  {
    id: 'RPT001',
    type: 'Pothole',
    title: 'Large pothole on Main Road',
    status: 'In Progress',
    priority: 'High',
    date: '2024-08-15',
    location: 'Main Road, Sector F-7'
  },
  {
    id: 'RPT002',
    type: 'Electricity Outage',
    title: 'Power outage in residential area',
    status: 'Resolved',
    priority: 'Medium',
    date: '2024-08-10',
    location: 'Block A, F-7/1'
  },
  {
    id: 'RPT003',
    type: 'Water Issue',
    title: 'Water leakage from main pipe',
    status: 'Pending',
    priority: 'High',
    date: '2024-08-20',
    location: 'Street 10, F-7/2'
  }
];

const CitizenDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="citizen-dashboard">
      
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-container">
          <div className="header-content">
            <h1 className="header-title">Citizen Portal</h1>
            <div className="header-actions">
              <Bell className="notification-bell" size={20} />
              <div className="user-info">
                <div className="user-avatar">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="user-name">{mockUser.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
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

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <UserInfo user={mockUser} />
            
            <div className="stats-grid">
              <div className="stat-card">
                <h3 className="stat-title">Total Reports</h3>
                <p className="stat-value total">{mockReports.length}</p>
              </div>
              <div className="stat-card">
                <h3 className="stat-title">Pending</h3>
                <p className="stat-value pending">
                  {mockReports.filter(r => r.status === 'Pending').length}
                </p>
              </div>
              <div className="stat-card">
                <h3 className="stat-title">Resolved</h3>
                <p className="stat-value resolved">
                  {mockReports.filter(r => r.status === 'Resolved').length}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reports' && <ReportStatus reports={mockReports} />}
        
        {activeTab === 'new-report' && <NewReportForm />}
      </main>
    </div>
  );
};

export default CitizenDashboard;
