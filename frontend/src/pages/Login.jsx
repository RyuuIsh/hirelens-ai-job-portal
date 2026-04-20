import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import { getDefaultDashboard } from "../utils/getDefaultDashboard";

function Login({ darkMode }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      toast.success("Login successful");
      navigate(getDefaultDashboard(response.data.user));
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        ...styles.wrapper,
        backgroundColor: darkMode ? "#111827" : "#f3f4f6",
      }}
    >
      <form
        style={{
          ...styles.form,
          backgroundColor: darkMode ? "#1f2937" : "white",
          color: darkMode ? "#f9fafb" : "#111827",
        }}
        onSubmit={handleSubmit}
      >
        <h2 style={styles.heading}>Welcome Back</h2>
        <p
          style={{
            ...styles.subtext,
            color: darkMode ? "#d1d5db" : "#6b7280",
          }}
        >
          Login to continue your journey with HireLens.
        </p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          style={{
            ...styles.input,
            backgroundColor: darkMode ? "#111827" : "white",
            color: darkMode ? "#f9fafb" : "#111827",
            border: darkMode ? "1px solid #374151" : "1px solid #d1d5db",
          }}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          style={{
            ...styles.input,
            backgroundColor: darkMode ? "#111827" : "white",
            color: darkMode ? "#f9fafb" : "#111827",
            border: darkMode ? "1px solid #374151" : "1px solid #d1d5db",
          }}
          required
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          style={{
            ...styles.footerText,
            color: darkMode ? "#d1d5db" : "#6b7280",
          }}
        >
          Don&apos;t have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "calc(100vh - 70px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
  },
  form: {
    width: "100%",
    maxWidth: "420px",
    padding: "32px",
    borderRadius: "18px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  heading: {
    margin: 0,
    textAlign: "center",
  },
  subtext: {
    margin: 0,
    textAlign: "center",
    fontSize: "14px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    outline: "none",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#111827",
    color: "white",
    cursor: "pointer",
  },
  error: {
    color: "red",
    margin: 0,
    fontSize: "14px",
    textAlign: "center",
  },
  footerText: {
    margin: 0,
    textAlign: "center",
    fontSize: "14px",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Login;