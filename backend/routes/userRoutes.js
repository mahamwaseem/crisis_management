import express from "express";
import { getProfile } from "../Controllers/userController.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();


router.get("/profile", authMiddleware, getProfile);

export default router;
