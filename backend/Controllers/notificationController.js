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

const createNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;

    // Create new notification
    const notification = await Notification.create({
      userId,
      message,
      type: type || "System"
    });

    res.status(201).json({
      success: true,
      data: notification
    });

    // Emit socket event 
    if (req.app.get('io')) {
      req.app.get('io').to(userId.toString()).emit('newNotification', notification);
    }
  } catch (err) {
    console.error("Error creating notification:", err);
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

const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (err) {
    console.error("Error deleting notification:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { 
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification
 };