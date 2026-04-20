import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

function JobCard({ job, darkMode }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleSaveJob = async () => {
    setMessage("");
    setError("");

    if (!token) {
      const msg = "Please login to save jobs.";
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      const response = await API.post("/saved-jobs", {
        jobId: job._id,
      });

      const msg = response.data.message || "Job saved successfully";
      setMessage(msg);
      toast.success(msg);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to save job.";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div
      style={{
        ...styles.card,
        backgroundColor: darkMode ? "#1f2937" : "white",
        color: darkMode ? "#f9fafb" : "#111827",
      }}
    >
      <h3 style={styles.title}>{job.title}</h3>
      <p
        style={{
          ...styles.company,
          color: darkMode ? "#d1d5db" : "#374151",
        }}
      >
        {job.company}
      </p>

      <div
        style={{
          ...styles.meta,
          color: darkMode ? "#9ca3af" : "#4b5563",
        }}
      >
        <span>📍 {job.location}</span>
        {job.salary && <span>💰 ₹{job.salary}</span>}
      </div>

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
        <Link to={`/jobs/${job._id}`} style={styles.button}>
          View Details
        </Link>

        <button onClick={handleSaveJob} style={styles.saveButton}>
          Save Job
        </button>
      </div>

      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  card: {
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  title: {
    margin: 0,
  },
  company: {
    margin: 0,
    fontWeight: "600",
  },
  meta: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    fontSize: "14px",
  },
  description: {
    margin: 0,
    lineHeight: "1.5",
  },
  actions: {
    marginTop: "8px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  button: {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: "8px",
    backgroundColor: "#111827",
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    border: "none",
  },
  saveButton: {
    padding: "10px 14px",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },
  success: {
    color: "green",
    fontSize: "14px",
    margin: 0,
  },
  error: {
    color: "red",
    fontSize: "14px",
    margin: 0,
  },
};

export default JobCard;