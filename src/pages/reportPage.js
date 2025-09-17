import React from "react";
import NewReportForm from "./NewReportForm";
import axios from "axios";

function ReportsPage() {
  const handleReportSubmit = async (payload) => {
    try {
      const res = await axios.post("http://localhost:3000/reports", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Report saved:", res.data);
      alert("✅ Report submitted!");
    } catch (err) {
      console.error("❌ Error saving report:", err);
    }
  };

  return <NewReportForm onSubmitReport={handleReportSubmit} />;
}

export default ReportsPage;
