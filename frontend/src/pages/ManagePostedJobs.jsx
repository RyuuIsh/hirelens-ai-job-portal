import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import Loader from "../components/Loader";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import EmptyState from "../components/EmptyState";
import SecondaryButton from "../components/SecondaryButton";
import { Link } from "react-router-dom";

function ManagePostedJobs({ darkMode }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");

        const allJobs = Array.isArray(res.data) ? res.data : [];

        const recruiterJobs = allJobs.filter((job) => {
          if (!job.postedBy) return true;
          if (typeof job.postedBy === "string") return job.postedBy === user?._id;
          return job.postedBy._id === user?._id;
        });

        setJobs(recruiterJobs);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user?._id]);

  const handleDeleteJob = async (jobId) => {
    if (deletingId) return;

    try {
      setDeletingId(jobId);
      await API.delete(`/jobs/${jobId}`);
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to delete job.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading posted jobs..." />;
  }

  return (
    <PageContainer darkMode={darkMode}>
      <PageHeader
        darkMode={darkMode}
        title="Manage Posted Jobs"
        subtitle="Review, update, and manage the jobs posted from your recruiter account."
      />

      {jobs.length === 0 ? (
        <EmptyState
          darkMode={darkMode}
          title="No posted jobs yet"
          text="Once you create jobs from your recruiter account, they will appear here."
        />
      ) : (
        <div style={styles.grid}>
          {jobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
            >
              <SectionCard darkMode={darkMode}>
                <h3 style={styles.title}>{job.title}</h3>

                <p
                  style={{
                    ...styles.company,
                    color: darkMode ? "#d1d5db" : "#374151",
                  }}
                >
                  {job.company}
                </p>

                {job.location && (
                  <p
                    style={{
                      ...styles.meta,
                      color: darkMode ? "#9ca3af" : "#4b5563",
                    }}
                  >
                    📍 {job.location}
                  </p>
                )}

                {job.salary && (
                  <p
                    style={{
                      ...styles.meta,
                      color: darkMode ? "#9ca3af" : "#4b5563",
                    }}
                  >
                    💰 ₹{job.salary}
                  </p>
                )}

                <p
                  style={{
                    ...styles.description,
                    color: darkMode ? "#d1d5db" : "#6b7280",
                  }}
                >
                  {job.description?.length > 120
                    ? `${job.description.slice(0, 120)}...`
                    : job.description}
                </p>

                <div style={styles.actions}>
                  <Link to={`/jobs/${job._id}`} style={styles.linkButton}>
                    View Job
                  </Link>

                  <Link
                    to={`/edit-job/${job._id}`}
                    style={{ ...styles.linkButton, backgroundColor: "#f59e0b" }}
                  >
                    Edit Job
                  </Link>

                  <Link
                    to={`/job-applicants/${job._id}`}
                    style={{ ...styles.linkButton, backgroundColor: "#059669" }}
                  >
                    View Applicants
                  </Link>

                  <SecondaryButton
                    onClick={() => handleDeleteJob(job._id)}
                    style={{ backgroundColor: "#ef4444" }}
                    disabled={deletingId === job._id}
                  >
                    {deletingId === job._id ? "Deleting..." : "Delete"}
                  </SecondaryButton>
                </div>
              </SectionCard>
            </motion.div>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  title: {
    marginTop: 0,
    marginBottom: "8px",
  },
  company: {
    margin: 0,
    marginBottom: "8px",
    fontWeight: "600",
  },
  meta: {
    margin: "4px 0",
  },
  description: {
    marginTop: "10px",
    marginBottom: "14px",
    lineHeight: 1.5,
  },
  actions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  linkButton: {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
  },
};

export default ManagePostedJobs;