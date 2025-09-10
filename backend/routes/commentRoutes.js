const authMiddleware = require("../Middlewares/authMiddleware");
const { addComment } = require("../Controllers/commentController")

const router = require("express").Router();

router.post('/', authMiddleware, addComment);