const router = require("express").Router();
const { getNotifications} = require("../Controllers/notificationController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getNotifications);


module.exports = router;