import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import Loader from "../components/Loader";
import PageContainer from "../components/PageContainer";
import SectionCard from "../components/SectionCard";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import SecondaryButton from "../components/SecondaryButton";

function SavedJobs({ darkMode }) {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await API.get("/saved-jobs");

        if (Array.isArray(res.data)) {
          setSavedJobs(res.data);
        } else if (Array.isArray(res.data.savedJobs)) {
          setSavedJobs(res.data.savedJobs);
        } else if (Array.isArray(res.data.jobs)) {
          setSavedJobs(res.data.jobs);
        } else {
          setSavedJobs([]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleRemoveSavedJob = async (jobId) => {
    try {
      await API.delete(`/saved-jobs/${jobId}`);
      setSavedJobs((prev) => prev.filter((item) => item.job?._id !== jobId));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Loader text="Loading saved jobs..." />;
  }

  return (
    <PageContainer darkMode={darkMode}>
      <PageHeader
        darkMode={darkMode}
        title="Saved Jobs"
        subtitle="Manage the jobs you bookmarked for later."
      />

      {savedJobs.length === 0 ? (
        <EmptyState
          darkMode={darkMode}
          title="No saved jobs yet"
          text="Save jobs you like and they will appear here."
        />
      ) : (
        <div style={styles.grid}>
          {savedJobs.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: index * 0.05 }}
            >
              <SectionCard darkMode={darkMode}>
                <h3 style={styles.title}>
                  {item.job?.title || "Untitled Job"}
                </h3>

                <p
                  style={{
                    ...styles.company,
                    color: darkMode ? "#d1d5db" : "#374151",
                  }}
                >
                  {item.job?.company || "Unknown Company"}
                </p>

                {item.job?.location && (
                  <p
                    style={{
                      ...styles.meta,
                      color: darkMode ? "#9ca3af" : "#4b5563",
                    }}
                  >
                    📍 {item.job.location}
                  </p>
                )}

                {item.job?.salary && (
                  <p
                    style={{
                      ...styles.meta,
                      color: darkMode ? "#9ca3af" : "#4b5563",
                    }}
                  >
                    💰 ₹{item.job.salary}
                  </p>
                )}

                <SecondaryButton
                  onClick={() => handleRemoveSavedJob(item.job?._id)}
                  style={{ marginTop: "12px", backgroundColor: "#ef4444" }}
                >
                  Remove
                </SecondaryButton>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
};

export default SavedJobs;