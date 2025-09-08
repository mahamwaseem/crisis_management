const router = require('express').Router();
const { createReport, getReports, getReportById, updateReport } = require('../Controllers/reportController');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/', authMiddleware, createReport);
router.get('/', authMiddleware, getReports );
router.get('/:id', authMiddleware, getReportById)
router.put('/:id', authMiddleware, updateReport)

module.exports = router;
