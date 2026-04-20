import SavedJob from "../models/SavedJob.js";


// Save Job
export const saveJob = async (req, res) => {

  try {

    const { jobId } = req.body;

    const existing = await SavedJob.findOne({
      user: req.user._id,
      job: jobId
    });

    if (existing) {
      return res.status(400).json({
        message: "Job already saved"
      });
    }

    const savedJob = await SavedJob.create({
      user: req.user._id,
      job: jobId
    });

    res.status(201).json({
      message: "Job saved successfully",
      savedJob
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// Get Saved Jobs
export const getSavedJobs = async (req, res) => {

  try {

    const savedJobs = await SavedJob.find({
      user: req.user._id
    }).populate("job");

    res.json(savedJobs);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// Remove Saved Job
export const removeSavedJob = async (req, res) => {

  try {

    await SavedJob.findOneAndDelete({
      user: req.user._id,
      job: req.params.jobId
    });

    res.json({
      message: "Saved job removed"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
