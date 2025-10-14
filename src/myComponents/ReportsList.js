import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../styles/ReportsList.css";

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleRowClick = (reportId) => {
    navigate(`/admin/report/${reportId}`);
  };

  const fetchReports = async () => {
    try {
      const res = await axios.get("/admin/reports", {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      setReports(res.data.data || []);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `/admin/reports/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );
      setReports((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
      );
      alert("Status updated successfully!");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <p className="loading-text">Loading reports...</p>;

  const handleBackToAdmin = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div className="reports-page">
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        marginBottom: "20px" 
      }}>
        <h1 className="reports-title">All Reports</h1>
        <button
          onClick={handleBackToAdmin}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            background: "#FFCC00",
            color: "#8C1007",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
        >
          <ArrowLeft size={20} /> Back to Admin Dashboard
        </button>
      </div>

      <div className="reports-table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr 
                key={report._id} 
                onClick={(e) => {
                  // Don't navigate if clicking on select or its options
                  if (e.target.tagName !== 'SELECT' && e.target.tagName !== 'OPTION') {
                    handleRowClick(report._id);
                  }
                }}
                className="report-row"
              >
                <td>{index + 1}</td>
                <td>{report.title}</td>
                <td>
                  <span className={`status-badge status-${report.status.toLowerCase().replace(' ', '')}`}>
                    {report.status}
                  </span>
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <select
                    className="status-select"
                    value={report.status}
                    onChange={(e) => updateStatus(report._id, e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td colSpan="4" className="no-reports">No reports found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsList;
