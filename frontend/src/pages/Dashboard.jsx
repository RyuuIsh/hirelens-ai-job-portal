import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import SectionCard from "../components/SectionCard";

function Dashboard({ darkMode }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const cards = [
    {
      to: "/jobs",
      title: "Browse Jobs",
      text: "Explore all available jobs and find roles that match your interests.",
    },
    {
      to: "/resume",
      title: "Resume Analyzer",
      text: "Upload your resume and get ATS score, skills, and suggestions.",
    },
    {
      to: "/recommend",
      title: "Recommendations",
      text: "Discover jobs that fit your matched skills automatically.",
    },
    {
      to: "/my-applications",
      title: "My Applications",
      text: "Track the status of your applications in one place.",
    },
    {
      to: "/saved-jobs",
      title: "Saved Jobs",
      text: "Review the jobs you bookmarked for later.",
    },
  ];

  return (
    <PageContainer darkMode={darkMode}>
      <PageHeader
        darkMode={darkMode}
        title={`Welcome${user?.name ? `, ${user.name}` : ""} 👋`}
        subtitle="Manage your applications, improve your resume, and discover better job opportunities."
      />

      <div style={styles.statsGrid}>
        <StatCard
          darkMode={darkMode}
          title="Profile Role"
          value={user?.role || "jobseeker"}
          subtitle="Current signed in role"
        />
        <StatCard
          darkMode={darkMode}
          title="Resume Tools"
          value="ATS"
          subtitle="Score, skills, suggestions"
        />
        <StatCard
          darkMode={darkMode}
          title="Recommendations"
          value="Smart"
          subtitle="Based on your profile"
        />
      </div>

      <SectionCard darkMode={darkMode} style={{ marginBottom: "20px" }}>
        <h3 style={styles.sectionTitle}>Quick Start</h3>
        <p style={styles.sectionText}>
          Use Resume Analyzer to understand your profile, then move to
          Recommendations to find jobs based on your matched skills.
        </p>

        <div style={styles.quickActions}>
          <Link to="/resume" style={styles.primaryLink}>
            Analyze Resume
          </Link>
          <Link to="/recommend" style={styles.secondaryLink}>
            View Recommendations
          </Link>
        </div>
      </SectionCard>

      <div style={styles.grid}>
        {cards.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <Link
              to={item.to}
              style={{
                ...styles.card,
                backgroundColor: darkMode ? "#1f2937" : "white",
                color: darkMode ? "#f9fafb" : "#111827",
              }}
            >
              <h3>{item.title}</h3>
              <p style={{ color: darkMode ? "#d1d5db" : "#4b5563" }}>
                {item.text}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },
  card: {
    display: "block",
    padding: "24px",
    borderRadius: "16px",
    textDecoration: "none",
    boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "10px",
  },
  sectionText: {
    marginTop: 0,
    marginBottom: "14px",
    lineHeight: 1.6,
  },
  quickActions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  primaryLink: {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
  },
  secondaryLink: {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: "10px",
    backgroundColor: "#111827",
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Dashboard;