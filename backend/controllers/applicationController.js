import Application from "../models/Application.js";

export const applyForJob = async (req, res) => {
  try {

    const { jobId } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required"
      });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user._id
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job"
      });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      resume: req.file.path
    });

    res.status(201).json({
      message: "Applied successfully",
      application
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};



export const getApplicationsForJob = async (req, res) => {

try {

const applications = await Application.find({
job: req.params.jobId
})
.populate("applicant", "name email")
.populate("job", "title company");

res.status(200).json(applications);

} catch (error) {

res.status(500).json({
message: error.message
});

}

};


export const updateApplicationStatus = async (req, res) => {

try {

const { status } = req.body;

const application = await Application.findById(req.params.id);

if (!application) {
return res.status(404).json({
message: "Application not found"
});
}

application.status = status;

await application.save();

res.status(200).json({
message: "Application status updated",
application
});

} catch (error) {

res.status(500).json({
message: error.message
});

}

};


export const getMyApplications = async (req, res) => {

try {

const applications = await Application.find({
applicant: req.user._id
})
.populate("job", "title company location salary");

res.status(200).json(applications);

} catch (error) {

res.status(500).json({
message: error.message
});

}

};
