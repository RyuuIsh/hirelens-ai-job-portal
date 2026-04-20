import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import SectionCard from "../components/SectionCard";
import Loader from "../components/Loader";

function RecruiterDashboard({ darkMode }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  console.log("CURRENT USER:", user);

  const [analytics, setAnalytics] = useState({
    totalJobs: 0,
    totalApplications: 0,
    applicationsPerJob: [],
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [analyticsRes, jobsRes] = await Promise.all([
          API.get("/analytics/recruiter"),
          API.get("/jobs"),
        ]);

        setAnalytics({
          totalJobs: analyticsRes.data.totalJobs || 0,
          totalApplications: analyticsRes.data.totalApplications || 0,
          applicationsPerJob: analyticsRes.data.applicationsPerJob || [],
        });

        setJobs(Array.isArray(jobsRes.data) ? jobsRes.data : []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const mappedApplications = useMemo(() => {
    return analytics.applicationsPerJob.map((item) => {
      const matchedJob = jobs.find((job) => job._id === item._id);

      return {
        id: item._id,
        title: matchedJob?.title || "Unknown Job",
        company: matchedJob?.company || "Unknown Company",
        applications: item.total || item.count || 0,
      };
    });
  }, [analytics.applicationsPerJob, jobs]);

  if (loading) {
    return <Loader text="Loading recruiter dashboard..." />;
  }

  if (user?.role !== "employer" && user?.role !== "recruiter") {
    return (
      <PageContainer darkMode={darkMode}>
        <PageHeader
          darkMode={darkMode}
          title="Recruiter Dashboard"
          subtitle="This section is available only for recruiter/employer accounts."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <SectionCard darkMode={darkMode}>
            <h3 style={{ marginTop: 0 }}>Access Restricted</h3>
            <p style={{ marginBottom: 0, lineHeight: 1.6 }}>
              You are currently logged in as{" "}
              <strong>{user?.role || "jobseeker"}</strong>. Please log in with a
              recruiter/employer account to view recruiter analytics.
            </p>
          </SectionCard>
        </motion.div>
      </PageContainer>
    );
  }

  return (
    <PageContainer darkMode={darkMode}>
      <PageHeader
        darkMode={darkMode}
        title="Recruiter Dashboard"
        subtitle="Manage job postings, applications, and hiring activity from one place."
      />

      <motion.div
        style={styles.statsGrid}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <StatCard
          darkMode={darkMode}
          title="Total Jobs"
          value={analytics.totalJobs}
          subtitle="Jobs posted by you"
        />
        <StatCard
          darkMode={darkMode}
          title="Total Applications"
          value={analytics.totalApplications}
          subtitle="Applications received"
        />
        <StatCard
          darkMode={darkMode}
          title="Tracked Jobs"
          value={mappedApplications.length}
          subtitle="Jobs with application data"
        />
        <StatCard
          darkMode={darkMode}
          title="Recruiter Role"
          value={user?.role || "employer"}
          subtitle="Current signed in role"
        />
      </motion.div>

      <motion.div
        style={styles.grid}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <SectionCard darkMode={darkMode}>
          <h3 style={styles.cardTitle}>Post a New Job</h3>
          <p style={styles.cardText}>
            Create and manage new openings for candidates.
          </p>
          <Link to="/create-job" style={styles.linkButton}>
            Create Job
          </Link>
        </SectionCard>

        <SectionCard darkMode={darkMode}>
          <h3 style={styles.cardTitle}>Track Applications</h3>
          <p style={styles.cardText}>
            Review candidates and follow current hiring activity.
          </p>
          <Link to="/manage-posted-jobs" style={styles.linkButton}>
            Manage Posted Jobs
          </Link>
        </SectionCard>

        <SectionCard darkMode={darkMode}>
          <h3 style={styles.cardTitle}>Resume Insights</h3>
          <p style={styles.cardText}>
            Analyze resumes and compare ATS readiness.
          </p>
          <Link to="/resume" style={styles.linkButton}>
            Open Resume Analyzer
          </Link>
        </SectionCard>

        <SectionCard darkMode={darkMode}>
          <h3 style={styles.cardTitle}>Recommendations</h3>
          <p style={styles.cardText}>
            Explore smart matching and recommendation flows.
          </p>
          <Link to="/recommend" style={styles.linkButton}>
            Open Recommendations
          </Link>
        </SectionCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.18 }}
      >
        <SectionCard darkMode={darkMode} style={{ marginTop: "20px" }}>
          <h3 style={styles.cardTitle}>Applications Per Job</h3>

          {mappedApplications.length === 0 ? (
            <p style={styles.cardText}>No application analytics available yet.</p>
          ) : (
            <div style={styles.analyticsList}>
              {mappedApplications.map((item) => (
                <div key={item.id} style={styles.analyticsRow}>
                  <div>
                    <p style={styles.analyticsTitle}>{item.title}</p>
                    <p style={styles.analyticsCompany}>{item.company}</p>
                  </div>

                  <div style={styles.analyticsCount}>
                    {item.applications} applications
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.26 }}
      >
        <SectionCard darkMode={darkMode} style={{ marginTop: "20px" }}>
          <h3 style={styles.cardTitle}>Recruiter Profile</h3>
          <p style={styles.cardText}>
            <strong>Name:</strong> {user?.name || "Recruiter"}
          </p>
          <p style={styles.cardText}>
            <strong>Email:</strong> {user?.email || "Not available"}
          </p>
          <p style={styles.cardText}>
            <strong>Role:</strong> {user?.role || "employer"}
          </p>
        </SectionCard>
      </motion.div>
    </PageContainer>
  );
}

const styles = {
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "10px",
  },
  cardText: {
    marginTop: 0,
    marginBottom: "12px",
    lineHeight: 1.6,
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
  analyticsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  analyticsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    borderRadius: "12px",
    backgroundColor: "rgba(59,130,246,0.08)",
  },
  analyticsTitle: {
    margin: 0,
    fontWeight: "700",
  },
  analyticsCompany: {
    margin: "4px 0 0 0",
    fontSize: "14px",
    opacity: 0.8,
  },
  analyticsCount: {
    fontWeight: "700",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
};

export default RecruiterDashboard;