import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "../styles/AdminReportDetails.css";


const containerStyle = {
  width: "100%",
  height: "300px",
};

const AdminReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDBJDsqlNlPZD6ZRnti7sCWYU-jEo2OB_c",
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`http://localhost:3000/report/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReport(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!report) return <p className="error">Report not found.</p>;

  const coordinates = report.location?.coordinates || [0, 0];
  const position = { lat: coordinates[1], lng: coordinates[0] };

  const handleBackClick = () => {
    navigate('/admin/reports');
  };



  return (
    <div className="report-page">
      <div className="report-navbar">
        <span>👨‍💼 Admin Report Details</span>
        <button onClick={handleBackClick} className="back-button">
          ← Back to Admin Reports
        </button>
      </div>

      <div className="admin-report-container">
        {/* Reporter Information Card */}
        <div className="info-card reporter-card">
          <div className="card-header">
            <i className="fas fa-user-circle"></i>
            <h3>Reporter Information</h3>
          </div>
          <div className="card-content">
            <div className="info-item">
              <span className="label">Name:</span>
              <span className="value">{report.userId?.name || 'Anonymous'}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{report.userId?.email || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="label">Report Date:</span>
              <span className="value">{new Date(report.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="info-item">
              <span className="label">Current Status:</span>
              <span className={`value status-badge ${report.status}`}>{report.status}</span>
            </div>
          </div>
        </div>

        
        {/* Report Details Card */}
        <div className="info-card details-card">
          <div className="card-header">
            <i className="fas fa-file-alt"></i>
            <h3>Report Details</h3>
          </div>
          <div className="card-content">
            <h2 className="report-title">{report.title}</h2>
            <div className="description-section">
              <h4>Description</h4>
              <p>{report.description}</p>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="info-card map-card">
          <div className="card-header">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Incident Location</h3>
          </div>
          <div className="map-container">
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={13}
              >
                <Marker position={position} />
              </GoogleMap>
            )}
          </div>
        </div>

        {/* Media Card */}
        <div className="info-card media-card">
          <div className="card-header">
            <i className="fas fa-images"></i>
            <h3>Attached Media</h3>
          </div>
          <div className="media-grid">
            {report.media && report.media.length > 0 ? (
              report.media.map((file, index) =>
                file.endsWith(".mp4") ? (
                  <div className="media-item video" key={index}>
                    <video controls>
                      <source
                        src={`http://localhost:3000${file}`}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                ) : (
                  <div className="media-item image" key={index}>
                    <img
                      src={`http://localhost:3000${file}`}
                      alt="report media"
                      onClick={() => window.open(`http://localhost:3000${file}`, '_blank')}
                    />
                  </div>
                )
              )
            ) : (
              <p className="no-media">No media files attached to this report</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportDetails;