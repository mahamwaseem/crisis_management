import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/ReportDetails.css";

const ReportDetails = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/report/${id}`)
      .then((res) => {
        setReport(res.data.data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!report) return <p className="error">Report not found.</p>;

  const coordinates = report.location?.coordinates || [0, 0];
  const position = [coordinates[1], coordinates[0]];

  return (
    <div className="report-page">
      {/* Header */}
      <header className="report-header">
        <h1>📋 Report Details</h1>
      </header>

      <div className="report-details">
        <h2>{report.title}</h2>
        <p className="report-desc">{report.description}</p>

        {/* Map */}
        <div className="map-container">
          <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={position}>
              <Popup>{report.title}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Media */}
        <div className="media-section">
          <h3>Attached Media</h3>
          {report.media && report.media.length > 0 ? (
            report.media.map((file, index) =>
              file.endsWith(".mp4") ? (
                <video key={index} controls>
                  <source src={`http://localhost:5000${file}`} type="video/mp4" />
                </video>
              ) : (
                <img key={index} src={`http://localhost:5000${file}`} alt="report media" />
              )
            )
          ) : (
            <p>No media uploaded.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
