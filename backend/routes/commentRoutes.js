const authMiddleware = require("../Middlewares/authMiddleware");
const { addComment, getComments } = require("../Controllers/commentController")

const router = require("express").Router();

router.post('/', authMiddleware, addComment);
router.get('/:reportId', authMiddleware, getComments);

module.exports = router;