import React, { useState } from "react";
import { Plus } from "lucide-react";
import "../styles/NewReportForm.css";

const NewReportForm = ({ onSubmitReport }) => {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    location: "",
    priority: "Medium",
    attachments: null,
  });

  const reportTypes = [
    "Flooding",
    "Electricity Outage",
    "Corruption",
    "Pothole",
    "Crime",
    "Water Issue",
    "Garbage Collection",
    "Street Light",
    "Sewerage Problem",
    "Traffic Issue",
    "Building Violation",
    "Noise Pollution",
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
      
      const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = pos.coords;

      
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("type", formData.type);
      payload.append("priority", formData.priority);
      if (formData.attachments) {
        payload.append("attachments", formData.attachments);
      }
      payload.append(
        "location",
        JSON.stringify({
          type: "Point",
          coordinates: [longitude, latitude],
          address: formData.location, 
        })
      );

      alert("Report submitted successfully!");

      alert("Report submitted successfully!");
    setFormData({
      type: "",
      title: "",
      description: "",
      location: "",
      priority: "Medium",
      attachments: null,
    });
  } catch (err) {
    console.error("Error submitting report:", err.response?.data || err);
    alert("Failed to submit report");
  }
};

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <h3 className="report-form-title">
        <Plus size={24} />
        File New Report
      </h3>

      <div className="report-grid">
        <div className="form-group">
          <label className="form-label">Report Type *</label>
          <select
            name="type"
            value={formData.type}
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

        <div className="form-group">
          <label className="form-label">Priority Level</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Emergency">Emergency</option>
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
          name="attachments"
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
