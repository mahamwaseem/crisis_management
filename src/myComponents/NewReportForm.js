import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import "../styles/NewReportForm.css";

const NewReportForm = ({ onSubmitReport }) => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    media: null,
  });

  const reportTypes = [
    "Road",
    "Corruption",
    "Flood",
    "Electricity",
    "Fire",
    "Earthquake",
    "Landslide",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please login first.");
        navigate("/login");
        return;
      }


      const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = pos.coords;

      const jsonPayload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: { type: "Point", coordinates: [longitude, latitude] },
      };

   
      const createRes = await fetch("http://localhost:3000/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jsonPayload),
      });

      const created = await createRes.json();
      if (!createRes.ok) throw created;


      if (formData.media) {
        const form = new FormData();
        form.append("media", formData.media);

        const uploadRes = await fetch(
          `http://localhost:3000/report/${created.data._id}/media`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: form,
          }
        );

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw uploadData;
      }

      alert("Report submitted successfully!");
      setFormData({
        category: "",
        title: "",
        description: "",
        location: "",
        media: null,
      });

      if (onSubmitReport) onSubmitReport(created.data);
    } catch (err) {
      console.error("Error submitting report:", err);
      alert(err.message || "Failed to submit report");
    }
  };

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <div className="report-form-title">
        <div className="title-left">
          <Plus size={24} />
          <span>File New Report</span>
        </div>
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>

      <div className="report-grid">
        <div className="form-group">
          <label className="form-label">Report Type *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="form-select"
          >
            <option value="">Select Report Type</option>
            {reportTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Report Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          placeholder="Brief title describing the issue"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Location *</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          required
          placeholder="Exact location or address of the issue"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Detailed Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows="4"
          placeholder="Provide detailed information about the issue"
          className="form-textarea"
        ></textarea>
      </div>

      <div className="form-group">
        <label className="form-label">Attach Evidence (Optional)</label>
        <input
          type="file"
          name="media"
          onChange={handleInputChange}
          accept="image/*,video/*,.pdf,.doc,.docx"
          className="form-file"
        />
        <p className="file-note">
          Supported formats: Images, Videos, PDF, Word documents (Max 10MB)
        </p>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-submit">
          Submit Report
        </button>
      </div>
    </form>
  );
};

export default NewReportForm;
