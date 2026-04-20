import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      postedBy: req.user._id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getAllJobs = async (req, res) => {

  try {

    const { keyword, location, minSalary } = req.query;

    let query = {};

    // Keyword search (title or company)
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } }
      ];
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Salary filter
    if (minSalary) {
      query.salary = { $gte: Number(minSalary) };
    }

    const jobs = await Job.find(query).populate(
      "postedBy",
      "name email"
    );

    res.status(200).json(jobs);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



export const getJobById = async (req, res) => {

try {

const job = await Job.findById(req.params.id)
.populate("postedBy", "name email");

if (!job) {
return res.status(404).json({
message: "Job not found"
});
}

res.status(200).json(job);

} catch (error) {

res.status(500).json({
message: error.message
});

}

};


export const deleteJob = async (req, res) => {

try {

const job = await Job.findById(req.params.id);

if (!job) {
return res.status(404).json({
message: "Job not found"
});
}

await job.deleteOne();

res.status(200).json({
message: "Job deleted successfully"
});

} catch (error) {

res.status(500).json({
message: error.message
});

}

};


export const updateJob = async (req, res) => {

try {

const job = await Job.findById(req.params.id);

if (!job) {
return res.status(404).json({
message: "Job not found"
});
}

const { title, company, location, salary, description } = req.body;

job.title = title || job.title;
job.company = company || job.company;
job.location = location || job.location;
job.salary = salary || job.salary;
job.description = description || job.description;

const updatedJob = await job.save();

res.status(200).json({
message: "Job updated successfully",
updatedJob
});

} catch (error) {

res.status(500).json({
message: error.message
});

}

};
