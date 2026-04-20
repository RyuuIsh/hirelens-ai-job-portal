import express from "express";
import { applyForJob, getApplicationsForJob, updateApplicationStatus, getMyApplications } from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Apply for job (with resume upload)
router.post("/", protect, upload.single("resume"), applyForJob);

// Get applications for a job (Recruiter)
router.get("/job/:jobId", protect, getApplicationsForJob);

// Update application status
router.put("/:id/status", protect, updateApplicationStatus);

// Get logged-in user's applications
router.get("/my", protect, getMyApplications);

export default router;
