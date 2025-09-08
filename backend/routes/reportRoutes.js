const router = require('express').Router();
const { createReport, getReports, getReportById } = require('../Controllers/reportController');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/', authMiddleware, createReport);
router.get('/', authMiddleware, getReports );
router.get('/:id', authMiddleware, getReportById)

module.exports = router;
