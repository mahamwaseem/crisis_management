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

module.exports = {
  addComment,
  getComments
}