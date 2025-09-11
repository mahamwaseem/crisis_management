const Comment = require("../models/comment");

const addComment = async(req, res) => {
  try{
    const { reportId, text} = req.body;

    if( !reportId || !text){
      return res.status(400).json({
        success: false,
        message: " ReportID and text is required"
      });
    }

    const comment = await Comment.create({
      reportId,
      userId: req.user.id,
      text,
    });

    res.status(200).json({
      success: true,
      data: comment
    });
  }catch(err){
    console.error("Error in adding comments", err);
    res.status(500).json({
      success: false,
      message: "Server error while adding comment"
    });
  }
};

const getComments = async(req, res) => {
  try{
    const {reportId} = req.params;

    const comments = await Comment.find({ reportId })
    .populate("userId", "name email")
    .sort({createdAt: -1});

    res.status(200).json({
      success : true,
      count: comments.length,
      data: comments
    });
  }catch(err){
    console.error("Error fetching comments", err);
    res.status(500).json({
      success: false,
      message:"Server Error while fetching comments"
    });
  }
};

const deleteComment = async(req, res) => {
   try {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    if (comment.userId.toString() !== req.user.id && req.user.role !== "Admin") {
      return res.status(403).json({ success: false, message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();
    res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ success: false, message: "Server error while deleting comment" });
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment
}