import React from 'react';
import { FileText, CheckCircle, Clock, AlertTriangle, MapPin, Calendar } from 'lucide-react';
import '../styles/ReportStatus.css';

const ReportStatus = ({ reports }) => {
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

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'badge priority-high';
      case 'Medium':
        return 'badge priority-medium';
      case 'Low':
        return 'badge priority-low';
      default:
        return 'badge';
    }
  };

  return (
    <div className="report-card">
      <h3 className="report-title">
        <FileText size={24} />
        Reports Status
      </h3>
      
      <div className="report-list">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div key={report._id} className="report-item">
              <div className="report-header">
                <div className="report-info">
                  <h4>{report.title}</h4>
                  <p>Report ID: {report._id}</p>

                  {/* Location ko readable banaya */}
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
                  <span className={getPriorityClass(report.priority || "Low")}>
                    {report.priority || "Low"} Priority
                  </span>
                </div>
              </div>

              <div className="report-footer">
                <span className="report-type">{report.category}</span>
                <button className="report-btn">View Details</button>
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
