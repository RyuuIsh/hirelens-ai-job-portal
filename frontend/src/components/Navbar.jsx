import { Link, useNavigate } from "react-router-dom";
import { getDefaultDashboard } from "../utils/getDefaultDashboard";

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isRecruiter =
    user?.role === "employer" || user?.role === "recruiter";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      style={{
        ...styles.nav,
        backgroundColor: darkMode ? "#030712" : "#111827",
        color: "white",
      }}
    >
      <h2 style={styles.logo}>HireLens</h2>

      <div style={styles.links}>
        <Link to="/jobs" style={styles.link}>Jobs</Link>

        {token && (
          <>
            <Link to={getDefaultDashboard(user)} style={styles.link}>
              {isRecruiter ? "Recruiter Dashboard" : "Dashboard"}
            </Link>

            {!isRecruiter && (
              <>
                <Link to="/resume" style={styles.link}>Resume Analyzer</Link>
                <Link to="/recommend" style={styles.link}>Recommendations</Link>
                <Link to="/my-applications" style={styles.link}>My Applications</Link>
                <Link to="/saved-jobs" style={styles.link}>Saved Jobs</Link>
              </>
            )}

            {isRecruiter && (
              <>
                <Link to="/create-job" style={styles.link}>
                  Create Job
                </Link>
                <Link to="/manage-posted-jobs" style={styles.link}>
                  Manage Jobs
                </Link>
                <Link to="/recruiter-dashboard" style={styles.link}>
                  Analytics
                </Link>
              </>
            )}
          </>
        )}

        <div
          style={styles.toggleWrapper}
          onClick={() => setDarkMode(!darkMode)}
        >
          <div
            style={{
              ...styles.toggle,
              backgroundColor: darkMode ? "#4ade80" : "#d1d5db",
            }}
          >
            <div
              style={{
                ...styles.toggleCircle,
                transform: darkMode
                  ? "translateX(24px)"
                  : "translateX(2px)",
              }}
            >
              {darkMode ? "🌙" : "☀️"}
            </div>
          </div>
        </div>

        {!token ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <span style={styles.userText}>
              {user?.name ? `Hi, ${user.name}` : "Logged in"}
            </span>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    color: "white",
    flexWrap: "wrap",
    gap: "12px",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },
  userText: {
    color: "#d1d5db",
    fontSize: "14px",
  },
  button: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ef4444",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
  },
  toggleWrapper: {
    cursor: "pointer",
  },
  toggle: {
    width: "50px",
    height: "26px",
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    padding: "2px",
    transition: "all 0.3s ease",
  },
  toggleCircle: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
};

export default Navbar;