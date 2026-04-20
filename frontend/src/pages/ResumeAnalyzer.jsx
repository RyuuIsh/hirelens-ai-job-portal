import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";
import PageContainer from "../components/PageContainer";
import SectionCard from "../components/SectionCard";
import PageHeader from "../components/PageHeader";
import PrimaryButton from "../components/PrimaryButton";

function ResumeAnalyzer({ darkMode }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [resume, setResume] = useState(null);
  const [role, setRole] = useState("full stack developer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    setError("");
    setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!resume) {
      setError("Please upload a resume PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("role", role);

    try {
      setLoading(true);

      const response = await API.post("/resume/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Resume analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToRecommendations = () => {
    if (!result?.matchedSkills?.length) return;

    navigate("/recommend", {
      state: { skills: result.matchedSkills },
    });
  };

  const renderTags = (items, bgColor, textColor) => {
    if (!items || items.length === 0) return null;

    return (
      <div style={styles.tagWrap}>
        {items.map((item, index) => (
          <span
            key={index}
            style={{
              ...styles.tag,
              backgroundColor: bgColor,
              color: textColor,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  const score = result?.atsScore || 0;

  return (
    <PageContainer darkMode={darkMode}>
      <PageHeader
        darkMode={darkMode}
        title="Resume Analyzer"
        subtitle="Upload your resume and get ATS score, matched skills, missing skills, and improvement suggestions."
      />

      <SectionCard darkMode={darkMode}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Select Job Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              ...styles.input,
              backgroundColor: darkMode ? "#111827" : "white",
              color: darkMode ? "#f9fafb" : "#111827",
              border: darkMode ? "1px solid #374151" : "1px solid #d1d5db",
            }}
          >
            <option value="frontend developer">Frontend Developer</option>
            <option value="backend developer">Backend Developer</option>
            <option value="full stack developer">Full Stack Developer</option>
            <option value="devops engineer">DevOps Engineer</option>
            <option value="data scientist">Data Scientist</option>
          </select>

          <label style={styles.label}>Upload Resume (PDF)</label>

          <motion.div
            whileHover={{ scale: 1.01 }}
            animate={{
              scale: dragActive ? 1.02 : 1,
              boxShadow: dragActive
                ? "0 0 0 4px rgba(37,99,235,0.18)"
                : "0 0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.2 }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragActive(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              const file = e.dataTransfer.files?.[0];
              handleFileSelect(file);
            }}
            onClick={() => fileInputRef.current?.click()}
            style={{
              ...styles.dropZone,
              backgroundColor: darkMode ? "#111827" : "#f9fafb",
              color: darkMode ? "#f9fafb" : "#111827",
              border: dragActive
                ? "2px dashed #2563eb"
                : darkMode
                ? "2px dashed #374151"
                : "2px dashed #d1d5db",
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
            />

            <div style={styles.dropContent}>
              <div style={styles.uploadIcon}>📄</div>
              <p style={styles.dropTitle}>Drag & drop your resume here</p>
              <p
                style={{
                  ...styles.dropSubtitle,
                  color: darkMode ? "#d1d5db" : "#6b7280",
                }}
              >
                or click to browse a PDF file
              </p>

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
            </div>
          </motion.div>

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Resume"}
          </PrimaryButton>
        </form>
      </SectionCard>

      {error && <p style={styles.error}>{error}</p>}

      {result && (
        <div style={styles.resultBox}>
          <SectionCard darkMode={darkMode} style={{ textAlign: "center" }}>
            <h2 style={{ marginTop: 0, marginBottom: "14px" }}>ATS Score</h2>

            <div
              style={{
                ...styles.scoreCircle,
                background: darkMode
                  ? `conic-gradient(#3b82f6 ${score}%, #374151 ${score}% 100%)`
                  : `conic-gradient(#2563eb ${score}%, #e5e7eb ${score}% 100%)`,
              }}
            >
              <div
                style={{
                  ...styles.scoreInner,
                  backgroundColor: darkMode ? "#111827" : "white",
                  color: darkMode ? "#f9fafb" : "#111827",
                }}
              >
                {score}%
              </div>
            </div>

            <p
              style={{
                marginTop: "16px",
                marginBottom: 0,
                color: darkMode ? "#d1d5db" : "#4b5563",
                textTransform: "capitalize",
              }}
            >
              Role: {result.role}
            </p>
          </SectionCard>

          <div style={styles.infoGrid}>
            {(result.email || result.phone) && (
              <SectionCard darkMode={darkMode}>
                <h3 style={{ marginTop: 0 }}>Contact Info</h3>
                {result.email && result.email !== "Not Found" && (
                  <p><strong>Email:</strong> {result.email}</p>
                )}
                {result.phone && result.phone !== "Not Found" && (
                  <p><strong>Phone:</strong> {result.phone}</p>
                )}
              </SectionCard>
            )}

            {result.breakdown && (
              <SectionCard darkMode={darkMode}>
                <h3 style={{ marginTop: 0 }}>Score Breakdown</h3>
                <p>Skill Score: {result.breakdown.skillScore ?? 0}</p>
                <p>Project Score: {result.breakdown.projectScore ?? 0}</p>
                <p>Education Score: {result.breakdown.educationScore ?? 0}</p>
                <p>Experience Score: {result.breakdown.experienceScore ?? 0}</p>
                <p>Contact Score: {result.breakdown.contactScore ?? 0}</p>
              </SectionCard>
            )}
          </div>

          {result.matchedSkills?.length > 0 && (
            <SectionCard darkMode={darkMode}>
              <h3 style={{ marginTop: 0 }}>Matched Skills</h3>
              {renderTags(result.matchedSkills, "#dcfce7", "#166534")}
            </SectionCard>
          )}

          {result.missingSkills?.length > 0 && (
            <SectionCard darkMode={darkMode}>
              <h3 style={{ marginTop: 0 }}>Missing Skills</h3>
              {renderTags(result.missingSkills, "#fee2e2", "#991b1b")}
            </SectionCard>
          )}

          {result.suggestions?.length > 0 && (
            <SectionCard darkMode={darkMode}>
              <h3 style={{ marginTop: 0 }}>Suggestions</h3>
              <ul style={styles.list}>
                {result.suggestions.map((item, index) => (
                  <li key={index} style={styles.listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </SectionCard>
          )}

          {result.matchedSkills?.length > 0 && (
            <SectionCard darkMode={darkMode}>
              <h3 style={{ marginTop: 0 }}>Next Step</h3>
              <p
                style={{
                  marginTop: "8px",
                  marginBottom: "12px",
                  color: darkMode ? "#d1d5db" : "#4b5563",
                }}
              >
                Use your matched skills to find recommended jobs automatically.
              </p>

              <PrimaryButton onClick={handleGoToRecommendations}>
                Find Jobs Based on Resume
              </PrimaryButton>
            </SectionCard>
          )}
        </div>
      )}
    </PageContainer>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  label: {
    fontWeight: "600",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
  },
  dropZone: {
    borderRadius: "14px",
    padding: "28px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  dropContent: {
    textAlign: "center",
  },
  uploadIcon: {
    fontSize: "38px",
    marginBottom: "8px",
  },
  dropTitle: {
    margin: 0,
    fontWeight: "700",
    fontSize: "18px",
  },
  dropSubtitle: {
    marginTop: "8px",
    marginBottom: 0,
    fontSize: "14px",
  },
  fileName: {
    marginTop: "14px",
    marginBottom: 0,
    fontSize: "14px",
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginTop: "14px",
  },
  resultBox: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  scoreCircle: {
    width: "170px",
    height: "170px",
    borderRadius: "50%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreInner: {
    width: "95px",
    height: "95px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    fontWeight: "700",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
  },
  tagWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "10px",
  },
  tag: {
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  list: {
    marginTop: "10px",
    paddingLeft: "20px",
  },
  listItem: {
    marginBottom: "8px",
  },
};

export default ResumeAnalyzer;