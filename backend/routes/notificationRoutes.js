const router = require("express").Router();
const { getNotifications, markAsRead, deleteNotification} = require("../Controllers/notificationController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getNotifications);
router.put("/:id/read", authMiddleware, markAsRead);
router.delete("/:id", authMiddleware, deleteNotification);


module.exports = router;