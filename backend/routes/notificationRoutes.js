const router = require("express").Router();
const { 
  getNotifications, 
  createNotification, 
  markAsRead, 
  deleteNotification
} = require("../Controllers/notificationController");
const authMiddleware = require("../Middlewares/authMiddleware");

router.get("/", authMiddleware, getNotifications);
router.post("/", authMiddleware, createNotification);
router.put("/:id/read", authMiddleware, markAsRead);
router.delete("/:id", authMiddleware, deleteNotification);

module.exports = router;