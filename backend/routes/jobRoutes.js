import express from "express";
import { createJob, getAllJobs, getJobById, deleteJob, updateJob } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import { recruiterOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, createJob);

router.get("/", getAllJobs);

router.get("/:id", getJobById);

router.put("/:id", protect, updateJob);

router.delete("/:id", protect, deleteJob);

router.post("/", protect, recruiterOnly, createJob);

router.put("/:id", protect, recruiterOnly, updateJob);

router.delete("/:id", protect, recruiterOnly, deleteJob);

export default router;
