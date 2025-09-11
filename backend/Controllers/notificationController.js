const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, data: notification });
  } catch (err) {
    console.error("Error updating notification:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { 
  getNotifications,
  markAsRead
 };