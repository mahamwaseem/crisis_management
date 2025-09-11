const Report = require("../models/Report");
const User = require("../models/users");


const getAllReports = async (req, res) => {
  try {
    const { status, category } = req.query;
    let query = {};

    if (status) query.status = status;
    if (category) query.category = category;

    const reports = await Report.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: reports });
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const getAnalytics = async (req, res) => {
  try {
    
    const reportsByCategory = await Report.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    
    const resolutionTimes = await Report.aggregate([
      { $match: { resolvedAt: { $exists: true } } },
      {
        $project: {
          resolutionTime: { $subtract: ["$resolvedAt", "$createdAt"] }
        }
      },
      {
        $group: {
          _id: null,
          avgResolutionTime: { $avg: "$resolutionTime" }
        }
      }
    ]);

    // Heatmap data (by location)
    const heatmapData = await Report.aggregate([
      {
        $group: {
          _id: { lat: "$location.lat", lng: "$location.lng" },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        reportsByCategory,
        avgResolutionTime: resolutionTimes[0]?.avgResolutionTime || 0,
        heatmapData
      }
    });
  } catch (err) {
    console.error("Error fetching analytics:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const updateReportStatus = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, resolvedAt: req.body.status === "Resolved" ? new Date() : null },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    res.status(200).json({ success: true, data: report });
  } catch (err) {
    console.error("Error updating report:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User removed successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getAllReports, getAnalytics, updateReportStatus, deleteUser };
