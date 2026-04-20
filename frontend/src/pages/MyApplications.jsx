import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import Loader from "../components/Loader";
import PageContainer from "../components/PageContainer";
import SectionCard from "../components/SectionCard";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";

function MyApplications({ darkMode }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get("/applications/my");
        setApplications(res.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

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
    return <Loader text="Loading applications..." />;
  }

  return (
    <PageContainer darkMode={darkMode}>
      <PageHeader
        darkMode={darkMode}
        title="My Applications"
        subtitle="Track the jobs you applied for and monitor their current status."
      />

      {applications.length === 0 ? (
        <EmptyState
          darkMode={darkMode}
          title="No applications yet"
          text="Start applying to jobs and your application history will appear here."
        />
      ) : (
        <div style={styles.list}>
          {applications.map((app, index) => (
            <motion.div
              key={app._id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: index * 0.05 }}
            >
              <SectionCard darkMode={darkMode}>
                <div style={styles.topRow}>
                  <div>
                    <h3 style={styles.title}>
                      {app.job?.title || "Untitled Job"}
                    </h3>
                    <p
                      style={{
                        ...styles.company,
                        color: darkMode ? "#d1d5db" : "#374151",
                      }}
                    >
                      {app.job?.company || "Unknown Company"}
                    </p>
                  </div>

                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    style={{
                      ...styles.badge,
                      ...getStatusStyle(app.status),
                    }}
                  >
                    {app.status || "Applied"}
                  </motion.span>
                </div>

                {app.job?.location && (
                  <p
                    style={{
                      ...styles.meta,
                      color: darkMode ? "#9ca3af" : "#4b5563",
                    }}
                  >
                    📍 {app.job.location}
                  </p>
                )}

                {app.job?.salary && (
                  <p
                    style={{
                      ...styles.meta,
                      color: darkMode ? "#9ca3af" : "#4b5563",
                    }}
                  >
                    💰 ₹{app.job.salary}
                  </p>
                )}
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
    marginBottom: "8px",
  },
  title: {
    margin: 0,
    marginBottom: "6px",
  },
  company: {
    margin: 0,
    fontWeight: "600",
  },
  meta: {
    margin: "4px 0",
  },
  badge: {
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "capitalize",
    whiteSpace: "nowrap",
  },
};

export default MyApplications;