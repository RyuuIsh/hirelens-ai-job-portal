import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
{
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },

    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    resume: {
        type: String,
        required: true
    },  

    status: {
        type: String,
        enum: ["applied", "reviewing", "accepted", "rejected"],
        default: "applied",
    },
},
{ timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
