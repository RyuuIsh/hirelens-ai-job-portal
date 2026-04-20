import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import Loader from "../components/Loader";

function JobDetails({ darkMode }) {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [resume, setResume] = useState(null);
  const [applyLoading, setApplyLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await API.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();

    if (applyLoading) return;

    if (!resume) {
      const message = "Please upload your resume before applying.";
      toast.error(message);
      return;
    }

    try {
      setApplyLoading(true);

      const formData = new FormData();
      formData.append("jobId", id);
      formData.append("resume", resume);

      const response = await API.post("/applications", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message || "Applied successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to apply for this job."
      );
    } finally {
      setApplyLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading job details..." />;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (!job) {
    return <div style={styles.message}>Job not found.</div>;
  }

  return (
    <div
      style={{
        ...styles.wrapper,
        backgroundColor: darkMode ? "#111827" : "#f3f4f6",
      }}
    >
      <div style={styles.container}>
        <div
          style={{
            ...styles.card,
            backgroundColor: darkMode ? "#1f2937" : "white",
            color: darkMode ? "#f9fafb" : "#111827",
          }}
        >
          <div style={styles.topSection}>
            <h1 style={styles.title}>{job.title}</h1>
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
          </div>

          <div style={styles.grid}>
            <div
              style={{
                ...styles.section,
                backgroundColor: darkMode ? "#111827" : "#f9fafb",
              }}
            >
              <h3
                style={{
                  ...styles.sectionTitle,
                  color: darkMode ? "#f9fafb" : "#111827",
                }}
              >
                Description
              </h3>
              <p
                style={{
                  ...styles.text,
                  color: darkMode ? "#d1d5db" : "#374151",
                }}
              >
                {job.description}
              </p>
            </div>

            {job.postedBy && (
              <div
                style={{
                  ...styles.section,
                  backgroundColor: darkMode ? "#111827" : "#f9fafb",
                }}
              >
                <h3
                  style={{
                    ...styles.sectionTitle,
                    color: darkMode ? "#f9fafb" : "#111827",
                  }}
                >
                  Posted By
                </h3>
                <p
                  style={{
                    ...styles.text,
                    color: darkMode ? "#d1d5db" : "#374151",
                  }}
                >
                  {job.postedBy.name}
                </p>
                {job.postedBy.email && (
                  <p
                    style={{
                      ...styles.text,
                      color: darkMode ? "#93c5fd" : "#2563eb",
                    }}
                  >
                    {job.postedBy.email}
                  </p>
                )}
              </div>
            )}
          </div>

          <div
            style={{
              ...styles.applySection,
              backgroundColor: darkMode ? "#111827" : "#f9fafb",
            }}
          >
            <h3
              style={{
                ...styles.sectionTitle,
                color: darkMode ? "#f9fafb" : "#111827",
              }}
            >
              Apply for this Job
            </h3>

            <form onSubmit={handleApply} style={styles.applyBox}>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
                style={{
                  ...styles.input,
                  backgroundColor: darkMode ? "#1f2937" : "white",
                  color: darkMode ? "#f9fafb" : "#111827",
                  border: darkMode ? "1px solid #374151" : "1px solid #d1d5db",
                }}
              />

              {resume && (
                <p
                  style={{
                    ...styles.fileName,
                    color: darkMode ? "#93c5fd" : "#2563eb",
                  }}
                >
                  Selected file: {resume.name}
                </p>
              )}

              <button
                type="submit"
                style={styles.button}
                disabled={applyLoading}
              >
                {applyLoading ? "Applying..." : "Apply Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "calc(100vh - 70px)",
    padding: "24px",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  card: {
    padding: "28px",
    borderRadius: "18px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  topSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  title: {
    margin: 0,
    fontSize: "2.2rem",
    lineHeight: 1.2,
  },
  company: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: "600",
  },
  meta: {
    display: "flex",
    gap: "18px",
    flexWrap: "wrap",
    fontSize: "15px",
    marginTop: "6px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "16px",
  },
  section: {
    padding: "18px",
    borderRadius: "14px",
  },
  applySection: {
    padding: "18px",
    borderRadius: "14px",
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "10px",
    fontSize: "1.15rem",
  },
  text: {
    margin: 0,
    lineHeight: 1.6,
    fontSize: "15px",
  },
  applyBox: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    outline: "none",
    fontSize: "15px",
  },
  fileName: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "500",
  },
  button: {
    padding: "12px 18px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#111827",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "600",
  },
  message: {
    textAlign: "center",
    padding: "40px",
    color: "#374151",
  },
  error: {
    textAlign: "center",
    padding: "40px",
    color: "red",
  },
};

export default JobDetails;