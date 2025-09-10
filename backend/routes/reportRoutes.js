const router = require('express').Router();
const { createReport, getReports, getReportById, updateReport, deleteReport, addMediaToReport, getNearByReport } = require('../Controllers/reportController');
const authMiddleware = require('../Middlewares/authMiddleware');
const upload = require('../utils/fileUpload'); 

router.get("/near", authMiddleware, getNearByReport);

router.post('/', authMiddleware, createReport);
router.get('/', authMiddleware, getReports );
router.get('/:id', authMiddleware, getReportById);
router.put('/:id', authMiddleware, updateReport);
router.delete('/:id', authMiddleware, deleteReport);
router.post('/:id/media', authMiddleware, upload.array("media", 5), addMediaToReport);


module.exports = router;
