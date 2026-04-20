import Job from "../models/Job.js";

export const recommendJobs = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || skills.length === 0) {
      return res.status(400).json({
        message: "No skills provided"
      });
    }

    const jobs = await Job.find({
      $or: skills.map(skill => ({
        description: { $regex: skill, $options: "i" }
      }))
    });

    res.json({
      message: "Recommended jobs based on your skills",
      skills,
      totalMatches: jobs.length,
      jobs
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
