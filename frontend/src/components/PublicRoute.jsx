import { Navigate } from "react-router-dom";
import { getDefaultDashboard } from "../utils/getDefaultDashboard";

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token) {
    return <Navigate to={getDefaultDashboard(user)} replace />;
  }

  return children;
}

export default PublicRoute;