import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";
import JobCard from "../components/JobCard";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";
import EmptyState from "../components/EmptyState";
import PrimaryButton from "../components/PrimaryButton";

function RecommendedJobs({ darkMode }) {
  const location = useLocation();

  const [skillsInput, setSkillsInput] = useState("");
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.skills?.length) {
      const autoSkills = location.state.skills.join(", ");
      setSkillsInput(autoSkills);
      fetchRecommendations(location.state.skills);
    }
  }, [location.state]);

  const fetchRecommendations = async (skillsArray) => {
    try {
      setLoading(true);
      setError("");

      const response = await API.post("/recommend/jobs", {
        skills: skillsArray,
      });

      setJobs(response.data.jobs || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get recommendations.");
    } finally {
      setLoading(false);
    }
  };

  const handleRecommend = async (e) => {
    e.preventDefault();
    setError("");
    setJobs([]);

    const skills = skillsInput
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    if (skills.length === 0) {
      setError("Please enter at least one skill.");
      return;
    }

    fetchRecommendations(skills);
  };

  return (
    <PageContainer darkMode={darkMode}>
      <PageHeader
        darkMode={darkMode}
        title="Recommended Jobs"
        subtitle="Use your skills to find jobs that match your profile."
      />

      <SectionCard darkMode={darkMode} style={{ marginBottom: "24px" }}>
        <form style={styles.form} onSubmit={handleRecommend}>
          <input
            type="text"
            placeholder="Example: react, node, mongodb"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            style={{
              ...styles.input,
              backgroundColor: darkMode ? "#111827" : "white",
              color: darkMode ? "#f9fafb" : "#111827",
              border: darkMode ? "1px solid #374151" : "1px solid #d1d5db",
            }}
          />

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Finding Jobs..." : "Get Recommendations"}
          </PrimaryButton>
        </form>

        {error && <p style={styles.error}>{error}</p>}
      </SectionCard>

      {jobs.length > 0 ? (
        <div style={styles.grid}>
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} darkMode={darkMode} />
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <EmptyState
            darkMode={darkMode}
            title="No recommendations yet"
            text="Enter your skills or come here from Resume Analyzer to get smart job suggestions."
          />
        )
      )}
    </PageContainer>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    minWidth: "260px",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  error: {
    color: "red",
    marginTop: "12px",
    marginBottom: 0,
  },
};

export default RecommendedJobs;