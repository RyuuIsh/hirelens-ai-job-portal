export function getDefaultDashboard(user) {
  if (!user) return "/login";

  if (user.role === "employer" || user.role === "recruiter") {
    return "/recruiter-dashboard";
  }

  return "/dashboard";
}