const ReportModel = require('../models/Report');
const User = require('../models/users');

const createReport = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;

    if (!title || !description || !category || !location) {
      return res.status(400).json({ success: false, message: "Please provide title description, category and location" });
    }

    if (!location.coordinates || location.coordinates.length != 2) {
      return res.status(400).json({ success: false, message: "Location coordiantes must be an array of [ longitude, latitude ]" });
    }

    const report = new ReportModel({
      userId: req.user.id,
      title,
      description,
      category,
      location,
      media: req.body.media || []
    });

    const SavedReport = await report.save();
    await SavedReport.populate('userId', 'name email');
    res.status(201).json({ success: true, data: SavedReport });
  } catch (err) {
    console.error('Error creating report: ', err);
    res.status(500).json({
      success: false,
      message: "Server error while creating report"
    });
  }
}

const getReports = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "Citizen") {
      query.userId = req.user.id;
    }

    const reports = await ReportModel.find(query)
      .populate("userId", " name email role")
      .sort({ createdAt: -1 }); // latest report will be shown first

    res.status(200).json({ success: true, count: reports.length, data: reports });
  } catch (err) {
    console.log(" Error fetching report");
    res.status(500).json({ success: false, message: 'Server error while fetching reports' });
  }
};

module.exports = {
  createReport,
  getReports
}
