import { Navigate } from "react-router-dom";

function RecruiterRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const isRecruiter =
    user?.role === "employer" || user?.role === "recruiter";

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isRecruiter) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RecruiterRoute;