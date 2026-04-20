import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const analyzeResume = async (req, res) => {
  try {

    const role = req.body.role?.toLowerCase() || "full stack developer";

    const data = new Uint8Array(fs.readFileSync(req.file.path));

    const pdf = await pdfjsLib.getDocument({ data }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {

      const page = await pdf.getPage(i);

      const content = await page.getTextContent();

      const strings = content.items.map(item => item.str);

      text += strings.join(" ");
    }

    text = text.toLowerCase();


    // =============================
    // Extract Email
    // =============================

    const emailMatch = text.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/);

    const email = emailMatch ? emailMatch[0] : "Not Found";


    // =============================
    // Extract Phone
    // =============================

    const phoneMatch = text.match(/\b\d{10}\b/);

    const phone = phoneMatch ? phoneMatch[0] : "Not Found";


    // =============================
    // ROLE BASED SKILLS
    // =============================

    const jobRoleSkills = {

      "frontend developer": [
        "html","css","javascript","react","redux","tailwind","bootstrap"
      ],

      "backend developer": [
        "node","express","mongodb","mysql","rest api","postgresql"
      ],

      "full stack developer": [
        "html","css","javascript","react","node","express","mongodb"
      ],

      "devops engineer": [
        "docker","kubernetes","aws","jenkins","terraform","linux"
      ],

      "data scientist": [
        "python","pandas","numpy","machine learning","tensorflow","pytorch"
      ]

    };


    const requiredSkills =
      jobRoleSkills[role] || jobRoleSkills["full stack developer"];


    // =============================
    // SKILL MATCHING
    // =============================

    const foundSkills = requiredSkills.filter(skill =>
      text.includes(skill)
    );


    const missingSkills = requiredSkills.filter(skill =>
      !text.includes(skill)
    );


    // =============================
    // ATS SCORE CALCULATION
    // =============================

    let score = 0;


    // 1️⃣ Skill Match Score (Max 40)

    const skillScore = Math.round(
      (foundSkills.length / requiredSkills.length) * 40
    );

    score += skillScore;


    // 2️⃣ Project Detection (Max 20)

    const projectKeywords = ["project","portfolio","developed","built"];

    const hasProjects = projectKeywords.some(word => text.includes(word));

    const projectScore = hasProjects ? 20 : 0;

    score += projectScore;


    // 3️⃣ Education Detection (Max 15)

    const educationKeywords = [
      "btech","bachelor","degree","university","college","bsc","msc"
    ];

    const hasEducation = educationKeywords.some(word => text.includes(word));

    const educationScore = hasEducation ? 15 : 0;

    score += educationScore;


    // 4️⃣ Experience Detection (Max 15)

    const experienceKeywords = [
      "experience","internship","intern","worked","company"
    ];

    const hasExperience = experienceKeywords.some(word => text.includes(word));

    const experienceScore = hasExperience ? 15 : 0;

    score += experienceScore;


    // 5️⃣ Contact Score (Max 10)

    let contactScore = 0;

    if (email !== "Not Found") contactScore += 5;

    if (phone !== "Not Found") contactScore += 5;

    score += contactScore;


    // Ensure score ≤ 100

    score = Math.min(score, 100);


    // =============================
    // RESUME SUGGESTIONS
    // =============================

    let suggestions = [];

    if (foundSkills.length < requiredSkills.length) {
      suggestions.push("Add more skills relevant to the selected job role.");
    }

    if (!hasProjects) {
      suggestions.push("Add project experience to showcase practical skills.");
    }

    if (!hasExperience) {
      suggestions.push("Include internships or work experience.");
    }

    if (!hasEducation) {
      suggestions.push("Mention your educational qualifications.");
    }

    if (email === "Not Found" || phone === "Not Found") {
      suggestions.push("Ensure your contact details are clearly visible.");
    }


    // =============================
    // API RESPONSE
    // =============================

    res.json({
      message: "Resume analyzed successfully",
      role,
      email,
      phone,
      matchedSkills: foundSkills,
      missingSkills,
      totalRequiredSkills: requiredSkills.length,
      matchedSkillCount: foundSkills.length,
      atsScore: score,
      suggestions,
      breakdown: {
        skillScore,
        projectScore,
        educationScore,
        experienceScore,
        contactScore
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};
