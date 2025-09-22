import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, Clock, AlertTriangle, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from "react-router-dom";   
import axios from "../api/axiosConfig";
import '../styles/ReportList.css';

const ReportStatus = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Resolved':
        return <CheckCircle size={20} color="#16a34a" />;
      case 'In Progress':
        return <Clock size={20} color="#ca8a04" />;
      case 'Pending':
        return <AlertTriangle size={20} color="#dc2626" />;
      default:
        return <Clock size={20} color="#6b7280" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Resolved':
        return 'badge status-resolved';
      case 'In Progress':
        return 'badge status-progress';
      case 'Pending':
        return 'badge status-pending';
      default:
        return 'badge';
    }
  };

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  
  const totalReports = reports.length;
  const resolvedReports = reports.filter(r => r.status === "Resolved").length;
  const pendingReports = reports.filter(r => r.status === "Pending").length;
  const inProgressReports = reports.filter(r => r.status === "In Progress").length;

  return (
    <div className="report-card">
      <h3 className="report-title">
        <FileText size={24} />
        My Reports
      </h3>

     
      <div className="report-summary">
        <div className="summary-box total">
          <h4>Total</h4>
          <p>{totalReports}</p>
        </div>
        <div className="summary-box resolved">
          <h4>Resolved</h4>
          <p>{resolvedReports}</p>
        </div>
        <div className="summary-box pending">
          <h4>Pending</h4>
          <p>{pendingReports}</p>
        </div>
        <div className="summary-box progress">
          <h4>In Progress</h4>
          <p>{inProgressReports}</p>
        </div>
      </div>

      
      <div className="report-list">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div key={report._id} className="report-item">
              <div className="report-header">
                <div className="report-info">
                  <h4>{report.title}</h4>
                  <p>Report ID: {report._id}</p>

                  <div className="report-meta">
                    <MapPin size={14} />
                    {report.location?.coordinates
                      ? `Lat: ${report.location.coordinates[1]}, Lng: ${report.location.coordinates[0]}`
                      : "Not Available"}
                  </div>

                  <div className="report-meta">
                    <Calendar size={14} />
                    {new Date(report.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="report-badges">
                  {getStatusIcon(report.status)}
                  <span className={getStatusClass(report.status)}>{report.status}</span>
                </div>
              </div>

              <div className="report-footer">
                <span className="report-type">{report.category}</span>
                <button 
                  className="report-btn"
                  onClick={() => navigate(`/report/${report._id}`)}   
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-reports">No reports submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReportStatus;
