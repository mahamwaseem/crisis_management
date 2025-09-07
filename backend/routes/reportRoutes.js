const router = require('express').Router();
const { createReport } = require('../Controllers/reportController');
const authMiddleware = require('../Middlewares/authMiddleware');

router.post('/', authMiddleware, createReport);

module.exports = router;
