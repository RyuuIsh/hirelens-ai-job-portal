import express from "express";
import { saveJob, getSavedJobs, removeSavedJob } from "../controllers/savedJobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, saveJob);

router.get("/", protect, getSavedJobs);

router.delete("/:jobId", protect, removeSavedJob);

export default router;
