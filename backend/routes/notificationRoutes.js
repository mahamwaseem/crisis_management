const router = require("express").Router();
const { getNotifications, markAsRead} = require("../Controllers/notificationController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getNotifications);
router.put("/:id/read", authMiddleware, markAsRead);


module.exports = router;