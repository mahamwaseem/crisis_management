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

module.exports = {
  addComment
}