import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("authToken"); 
        const res = await axios.get("http://localhost:3000/report", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", res.data);
        setReports(res.data.data || res.data || []);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>All Reports</h2>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        reports.map((report) => (
          <div
            key={report._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "6px",
            }}
          >
            <h3>{report.title}</h3>
            <p>{report.description}</p>
            <p>
              <strong>Category:</strong> {report.category}
            </p>
            <p>
              <strong>Status:</strong> {report.status}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(report.createdAt).toLocaleString()}
            </p>
            {report.location?.coordinates ? (
              <p>
                <strong>Location:</strong>{" "}
                Lat {report.location.coordinates[1]}, Lng{" "}
                {report.location.coordinates[0]}
              </p>
            ) : (
              <p>
                <strong>Location:</strong> Not Available
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReportsList;
