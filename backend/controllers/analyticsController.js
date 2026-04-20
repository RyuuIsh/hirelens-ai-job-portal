import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const getRecruiterAnalytics = async (req, res) => {
  try {
    const recruiterId = req.user._id;

    const recruiterJobs = await Job.find({ postedBy: recruiterId });

    const jobIds = recruiterJobs.map((job) => job._id);

    const totalJobs = recruiterJobs.length;

    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });

    const applicationsPerJob = await Application.aggregate([
      {
        $match: {
          job: { $in: jobIds },
        },
      },
      {
        $group: {
          _id: "$job",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      totalJobs,
      totalApplications,
      applicationsPerJob,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};