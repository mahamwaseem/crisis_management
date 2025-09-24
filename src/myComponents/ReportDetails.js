import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "../styles/ReportDetails.css";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const ReportDetails = () => {
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

  return (
    <div className="report-page">
      <div className="report-navbar">
        <span>📋 Report Details</span>
      </div>


      <div className="report-details">
        <h2>{report.title}</h2>
        <p className="report-desc">{report.description}</p>

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

        <div className="media-section">
          <h3>Attached Media</h3>
          {report.media && report.media.length > 0 ? (
            report.media.map((file, index) =>
              file.endsWith(".mp4") ? (
                <video key={index} controls>
                  <source
                    src={`http://localhost:3000${file}`}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <img
                  key={index}
                  src={`http://localhost:3000${file}`}
                  alt="report media"
                />
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
