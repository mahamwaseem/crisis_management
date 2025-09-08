const router = require('express').Router();
const { createReport, getReports } = require('../Controllers/reportController');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/', authMiddleware, createReport);
router.get('/', authMiddleware, getReports );

module.exports = router;
