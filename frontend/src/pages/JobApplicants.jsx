import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import Loader from "../components/Loader";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import EmptyState from "../components/EmptyState";
import PrimaryButton from "../components/PrimaryButton";

function JobApplicants({ darkMode }) {
  const { id } = useParams();

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await API.get(`/applications/job/${id}`);
        setApplicants(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id]);

  const handleStatusUpdate = async (applicationId, status) => {
    if (updatingId) return;

    try {
      setUpdatingId(applicationId);

      await API.put(`/applications/${applicationId}/status`, { status });

      setApplicants((prev) =>
        prev.map((item) =>
          item._id === applicationId ? { ...item, status } : item
        )
      );
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "accepted") {
      return { backgroundColor: "#dcfce7", color: "#166534" };
    }
    if (status === "rejected") {
      return { backgroundColor: "#fee2e2", color: "#991b1b" };
    }
    if (status === "review") {
      return { backgroundColor: "#dbeafe", color: "#1d4ed8" };
    }
    return { backgroundColor: "#e5e7eb", color: "#374151" };
  };

  if (loading) {
    return <Loader text="Loading applicants..." />;
  }

  return (
    <PageContainer darkMode={darkMode}>
      <PageHeader
        darkMode={darkMode}
        title="Job Applicants"
        subtitle="Review candidates who applied for this job and update their status."
      />

      {applicants.length === 0 ? (
        <EmptyState
          darkMode={darkMode}
          title="No applicants yet"
          text="Once users apply for this job, they will appear here."
        />
      ) : (
        <div style={styles.list}>
          {applicants.map((application, index) => (
            <motion.div
              key={application._id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: index * 0.05 }}
            >
              <SectionCard darkMode={darkMode}>
                <div style={styles.topRow}>
                  <div>
                    <h3 style={styles.title}>
                      {application.applicant?.name || "Unnamed Applicant"}
                    </h3>
                    <p
                      style={{
                        ...styles.email,
                        color: darkMode ? "#d1d5db" : "#374151",
                      }}
                    >
                      {application.applicant?.email || "Not available"}
                    </p>
                  </div>

                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    style={{
                      ...styles.badge,
                      ...getStatusStyle(application.status),
                    }}
                  >
                    {application.status || "Applied"}
                  </motion.span>
                </div>

                <p
                  style={{
                    ...styles.meta,
                    color: darkMode ? "#9ca3af" : "#4b5563",
                  }}
                >
                  <strong>Job:</strong> {application.job?.title || "Untitled Job"}
                </p>

                <div style={styles.actions}>
                  <PrimaryButton
                    onClick={() =>
                      handleStatusUpdate(application._id, "accepted")
                    }
                    style={{ backgroundColor: "#16a34a" }}
                    disabled={updatingId === application._id}
                  >
                    {updatingId === application._id ? "Updating..." : "Accept"}
                  </PrimaryButton>

                  <PrimaryButton
                    onClick={() =>
                      handleStatusUpdate(application._id, "rejected")
                    }
                    style={{ backgroundColor: "#dc2626" }}
                    disabled={updatingId === application._id}
                  >
                    {updatingId === application._id ? "Updating..." : "Reject"}
                  </PrimaryButton>

                  <PrimaryButton
                    onClick={() =>
                      handleStatusUpdate(application._id, "review")
                    }
                    style={{ backgroundColor: "#2563eb" }}
                    disabled={updatingId === application._id}
                  >
                    {updatingId === application._id ? "Updating..." : "Mark Review"}
                  </PrimaryButton>
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
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "10px",
  },
  title: {
    margin: 0,
    marginBottom: "4px",
  },
  email: {
    margin: 0,
    fontWeight: "500",
  },
  meta: {
    margin: "6px 0 14px 0",
  },
  badge: {
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "capitalize",
    whiteSpace: "nowrap",
  },
  actions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "10px",
  },
};

export default JobApplicants;