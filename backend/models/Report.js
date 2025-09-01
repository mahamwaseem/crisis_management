const { required, string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    enum: ["Road", "Corruption", "Flood", "Electricity", "Other"],
    required: true,
  },

  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved", "Closed"],
    default: "Open",
  },

  location:{
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates :{
      type: [Number],
      required: true,
    },
  },
  media: [String],
}, { timestamps: true }
);
ReportSchema.index({ location: "2dsphere"});

module.exports = mongoose.model("Report", ReportSchema);