const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reports",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    text: {
      type: String,
      required: true,
      trim: true

    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Comment", commentSchema);