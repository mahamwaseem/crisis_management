const authMiddleware = require("../Middlewares/authMiddleware");
const { addComment, getComments, deleteComment } = require("../Controllers/commentController")

const router = require("express").Router();

router.post('/', authMiddleware, addComment);
router.get('/:reportId', authMiddleware, getComments);
router.delete("/:id", authMiddleware, deleteComment);

module.exports = router;