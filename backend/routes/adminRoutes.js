const router = require("express").Router();
const { getAllReports, getAnalytics, updateReportStatus, deleteUser } = require("../Controllers/adminController");
const authMiddleware = require("../Middlewares/authMiddleware");
const roleMiddleware = require("../Middlewares/roleMiddleware");


router.get("/reports", authMiddleware, roleMiddleware(["Admin"]), getAllReports);
router.get("/analytics", authMiddleware, roleMiddleware(["Admin"]), getAnalytics);
router.put("/reports/:id", authMiddleware, roleMiddleware(["Admin"]), updateReportStatus);
router.delete("/users/:id", authMiddleware, roleMiddleware(["Admin"]), deleteUser);

module.exports = router;
