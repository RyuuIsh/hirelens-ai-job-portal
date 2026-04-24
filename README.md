# 🚀 HireLens — AI-Powered Job Portal with ATS Resume Analyzer

## 📌 Overview
**HireLens** is a full-stack MERN-based job portal that combines traditional job searching with an **AI-powered ATS (Applicant Tracking System) Resume Analyzer**.  
It enables jobseekers to analyze their resumes, identify skill gaps, and get job recommendations, while recruiters can efficiently manage job postings and applicants.

---

## ✨ Key Features

### 👤 Jobseeker Features
- 🔐 JWT-based authentication (Register/Login)
- 📄 Resume upload (PDF) with drag-and-drop UI
- 📊 ATS Resume Analysis:
  - Skill extraction
  - ATS score calculation
  - Missing skills detection
  - Improvement suggestions
- 🎯 Job recommendations based on matched skills
- 💼 Browse & filter jobs
- 📌 Save jobs for later
- 📥 Apply to jobs
- 📊 Track application status

---

### 🏢 Recruiter Features
- 🧑‍💼 Role-based recruiter access
- ➕ Create job postings
- 🛠 Manage posted jobs (Edit/Delete)
- 👀 View applicants per job
- 🔄 Update applicant status (Accept / Reject / Review)
- 📊 Recruiter dashboard with analytics

---

### 🎨 UI/UX Features
- 🌙 Dark mode support
- ⚡ Smooth animations (Framer Motion)
- 🧩 Modular reusable components
- 📱 Fully responsive design
- 🔔 Toast notifications

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Framer Motion
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Authentication
- JSON Web Tokens (JWT)


---

## 🌐 API Overview

### Auth Routes
- POST `/api/auth/register`
- POST `/api/auth/login`

### Job Routes
- GET `/api/jobs`
- POST `/api/jobs`
- PUT `/api/jobs/:id`
- DELETE `/api/jobs/:id`

### Application Routes
- POST `/api/applications`
- GET `/api/applications/my`
- GET `/api/applications/job/:id`
- PUT `/api/applications/:id/status`

### Resume Routes
- POST `/api/resume/analyze`

### Recommendation Routes
- POST `/api/recommend/jobs`


---

## 🔐 Environment Variables

| Variable | Description |
|--------|------------|
| PORT | Server port |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for authentication |

---

## 🚀 Future Improvements
- Email notifications for application updates  
- Cloud storage for resumes (AWS S3)  
- Advanced analytics dashboard  
- Interview scheduling system  
- Resume history tracking  

---

## 🎯 Resume Description

**HireLens — AI-Powered Job Portal | MERN Stack**  
Built a role-based job portal with JWT authentication and recruiter workflows.  
Developed ATS resume analysis with skill matching and scoring.  
Implemented job management, application tracking, and a modern UI.

---

## 🧑‍💻 Author

**Ishaan Chhabra**  
- GitHub: https://github.com/RyuuIsh  
- LinkedIn: https://linkedin.com/in/ishaan-chhabra-8ab85620  

---

## ⭐ Conclusion

HireLens bridges the gap between traditional job portals and intelligent hiring systems by integrating resume analysis, skill-based matching, and recruiter tools into one unified platform.

---

## 📜 License
This project is for educational and portfolio purposes.
# deployment test
