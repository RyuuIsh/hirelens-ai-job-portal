import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { getDefaultDashboard } from "./utils/getDefaultDashboard";
import { Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import RecruiterRoute from "./components/RecruiterRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import RecommendedJobs from "./pages/RecommendedJobs";
import Dashboard from "./pages/Dashboard";
import MyApplications from "./pages/MyApplications";
import SavedJobs from "./pages/SavedJobs";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import ManagePostedJobs from "./pages/ManagePostedJobs";
import JobApplicants from "./pages/JobApplicants";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.body.style.backgroundColor = darkMode ? "#111827" : "#f3f4f6";
    document.body.style.color = darkMode ? "#f9fafb" : "#111827";
    document.body.style.margin = "0";
    document.body.style.fontFamily = "Arial, sans-serif";
  }, [darkMode]);

  return (
    <Router>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <ToastContainer position="top-right" autoClose={2500} />

      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate
                to={getDefaultDashboard(JSON.parse(localStorage.getItem("user")))}
                replace
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login darkMode={darkMode} />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register darkMode={darkMode} />
            </PublicRoute>
          }
        />

        <Route path="/jobs" element={<Jobs darkMode={darkMode} />} />
        <Route path="/jobs/:id" element={<JobDetails darkMode={darkMode} />} />

        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <ResumeAnalyzer darkMode={darkMode} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommend"
          element={
            <ProtectedRoute>
              <RecommendedJobs darkMode={darkMode} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard darkMode={darkMode} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter-dashboard"
          element={
            <RecruiterRoute>
              <RecruiterDashboard darkMode={darkMode} />
            </RecruiterRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications darkMode={darkMode} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute>
              <SavedJobs darkMode={darkMode} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-job"
          element={
            <RecruiterRoute>
              <CreateJob darkMode={darkMode} />
            </RecruiterRoute>
          }
        />

        <Route
          path="/manage-posted-jobs"
          element={
            <RecruiterRoute>
              <ManagePostedJobs darkMode={darkMode} />
            </RecruiterRoute>
          }
        />

        <Route
          path="/job-applicants/:id"
          element={
            <RecruiterRoute>
              <JobApplicants darkMode={darkMode} />
            </RecruiterRoute>
          }
        />

        <Route
          path="/edit-job/:id"
          element={
            <RecruiterRoute>
              <EditJob darkMode={darkMode} />
            </RecruiterRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;