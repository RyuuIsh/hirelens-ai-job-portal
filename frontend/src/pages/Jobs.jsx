import { useEffect, useState } from "react";
import API from "../services/api";
import JobCard from "../components/JobCard";
import JobCardSkeleton from "../components/JobCardSkeleton";

function Jobs({ darkMode }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [minSalary, setMinSalary] = useState("");

  const fetchJobs = async (
  searchKeyword = "",
  searchLocation = "",
  searchMinSalary = ""
) => {
  try {
    setLoading(true);
    setError("");

    const params = new URLSearchParams();

    if (searchKeyword.trim()) {
      params.append("keyword", searchKeyword.trim());
    }

    if (searchLocation.trim()) {
      params.append("location", searchLocation.trim());
    }

    if (searchMinSalary.toString().trim()) {
      params.append("minSalary", searchMinSalary);
    }

    const queryString = params.toString();
    const url = queryString ? `/jobs?${queryString}` : "/jobs";

    const response = await API.get(url);
    setJobs(response.data);
  } catch (err) {
    setError(err.response?.data?.message || "Failed to fetch jobs");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(keyword, location, minSalary);
  };

  return (
    <div
      style={{
        ...styles.wrapper,
        backgroundColor: darkMode ? "#111827" : "#f3f4f6",
      }}
    >
      <div style={styles.container}>
        <h1
          style={{
            ...styles.heading,
            color: darkMode ? "#f9fafb" : "#111827",
          }}
        >
          Available Jobs
        </h1>

        <p
          style={{
            ...styles.subtext,
            color: darkMode ? "#d1d5db" : "#6b7280",
          }}
        >
          Explore jobs posted on HireLens.
        </p>

        <form
          style={{
            ...styles.searchForm,
            backgroundColor: darkMode ? "#1f2937" : "white",
          }}
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="🔍 Job title or company"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              ...styles.input,
              backgroundColor: darkMode ? "#111827" : "white",
              color: darkMode ? "#f9fafb" : "#111827",
              border: darkMode ? "1px solid #374151" : "1px solid #d1d5db",
            }}
          />

          <input
            type="text"
            placeholder="📍 Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              ...styles.input,
              backgroundColor: darkMode ? "#111827" : "white",
              color: darkMode ? "#f9fafb" : "#111827",
              border: darkMode ? "1px solid #374151" : "1px solid #d1d5db",
            }}
          />

          <input
            type="number"
            placeholder="💰 Minimum Salary"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            style={{
              ...styles.input,
              backgroundColor: darkMode ? "#111827" : "white",
              color: darkMode ? "#f9fafb" : "#111827",
              border: darkMode ? "1px solid #374151" : "1px solid #d1d5db",
            }}
          />

          <button type="submit" style={styles.button}>
            Search
          </button>

          <button
            type="button"
            style={styles.clearButton}
            onClick={() => {
              setKeyword("");
              setLocation("");
              setMinSalary("");
              fetchJobs();
            }}
          >
            Clear
          </button>
        </form>

        {loading ? (
          <div style={styles.grid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div style={styles.error}>{error}</div>
        ) : jobs.length === 0 ? (
          <p
            style={{
              ...styles.message,
              color: darkMode ? "#d1d5db" : "#374151",
            }}
          >
            No jobs found.
          </p>
        ) : (
          <div style={styles.grid}>
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} darkMode={darkMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "calc(100vh - 70px)",
    padding: "32px",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  heading: {
    marginBottom: "8px",
  },
  subtext: {
    marginBottom: "24px",
  },
  searchForm: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "12px",
    marginBottom: "24px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#111827",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  message: {
    textAlign: "center",
    padding: "30px",
  },
  clearButton: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#6b7280",
    color: "white",
    cursor: "pointer",
  },
  error: {
    textAlign: "center",
    padding: "30px",
    color: "red",
  },
};

export default Jobs;