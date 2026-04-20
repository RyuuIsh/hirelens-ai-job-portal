export const recruiterOnly = (req, res, next) => {
  if (req.user && (req.user.role === "employer" || req.user.role === "recruiter")) {
    next();
  } else {
    res.status(403).json({
      message: "Access denied. Recruiters only.",
    });
  }
};