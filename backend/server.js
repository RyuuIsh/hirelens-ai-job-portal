import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import savedJobRoutes from "./routes/savedJobRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./config/db.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/saved-jobs", savedJobRoutes);

app.use("/api/recommend", recommendationRoutes);

app.get("/", (req, res) => {
    res.send("Job Portal API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
