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
    console.log(" Error fetching report", err);
    res.status(500).json({ success: false, message: 'Server error while fetching reports' });
  }
};

const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await ReportModel.findById(id)
      .populate("userId", "name email role");

    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    if (req.user.role === 'Citizen' && report.userId._id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: " You are not authorized to view this report" });
    }

    res.status(200).json({
      success: true,
      data: report
    });
  } catch (err) {
    console.log('Error fetching report', err);
    res.status(500).json({ success: false, message: err.message || "Server error while fetching report details" })
  }
};

const updateReport = async (req, res) => {
  try {
    const { id } = req.params;

    let report = await ReportModel.findById(id)

    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    if (req.user.role === 'Citizen' && report.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'You are not authorized to update this report' });
    }

    const allowUpdates = ["title", "descripyion", "category", "location", "media"];
    if (req.user.role !== 'Citizen') {
      allowUpdates.push("status");
    }

    allowUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        report[field] = req.body[field];
      }
    });

    await report.save();
    await report.populate("userId", " name, email, role");

    res.status(200).json({ success: true, message: 'Report Updates Successfully', data: report });
  } catch (err) {
    console.log('Error updating report', err);
    res.status(500).json({ success: false, message: err.message || "Server error while updating report" });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await ReportModel.findById(id);

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    if (req.user.role === 'Citizen' && report.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: " You are not authorized to delete this report"
      });
    }

    await report.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Report deletes successfully'
    });

  } catch (err) {
    console.log('Error deleting report', err);
    res.status(500).json({
      success: false,
      message: err.message || " Server error while deleting report"
    });
  }
};

const addMediaToReport = async (req, res) => {
  try {
    const { id } = req.params;

    let report = await ReportModel.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    if (req.user.role === "Citizen" && report.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to add media to this report",
      });
    }

    const fileUrls = req.files.map(file => `/uploads/${file.filename}`);
    report.media.push(...fileUrls);

    await report.save();

    res.status(200).json({
      success: true,
      message: "Media uploaded successfully",
      data: report,
    });
  } catch (err) {
    console.log("Error uploading media", err);
    res.status(500).json({
      success: false,
      message: err.message || "Server error while  uploading media ",
    });
  }
};

const getNearByReport = async (req, res) => {
  try {
    const { lat, lng, distance = 5000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Langitutde are required"
      });
    }

    const report = await ReportModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          distanceField: "dist.calculated",
          maxDistance: parseInt(distance),
          spherical: true
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
      },
     },

     {
      $unwind: "$user"
     },

     {
      $project: {
        title: 1,
        description: 1,
        category: 1,
        status: 1,
        location: 1,
        media: 1,
        createdAt : 1,
        "user.name" : 1,
        "user.email" : 1,
        "dist.calculated": 1

      }
     }
 ]);
 res.status(200).json({
  success: true,
  count: report.length,
  data: report
 });

  }catch(err){
    console.error("Error fetching nearby reports", err);
    res.status(500).json({
      success: false,
      message:" Server error while fetching nearby reports"
    });
  }
};

module.exports = {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
  addMediaToReport,
  getNearByReport
}
