import express from "express";
import { recommendJobs } from "../controllers/recommendationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/jobs", protect, recommendJobs);

export default router;
