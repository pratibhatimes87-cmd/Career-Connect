
/* =========================================
   CAREERCONNECT - RESUME ASSISTANT
========================================= */


/* =========================================
   GET HTML ELEMENTS
========================================= */

const resumeForm = document.getElementById("resumeForm");

const emptyResult = document.getElementById("emptyResult");
const suggestionResult = document.getElementById("suggestionResult");

const jobTitle = document.getElementById("jobTitle");
const companyName = document.getElementById("companyName");
const jobDescription = document.getElementById("jobDescription");

const studentName = document.getElementById("studentName");
const studentEmail = document.getElementById("studentEmail");
const studentPhone = document.getElementById("studentPhone");
const studentLocation = document.getElementById("studentLocation");

const education = document.getElementById("education");
const studentSummary = document.getElementById("studentSummary");
const studentSkills = document.getElementById("studentSkills");
const studentProjects = document.getElementById("studentProjects");
const studentExperience = document.getElementById("studentExperience");
const studentCertifications = document.getElementById("studentCertifications");

const importProfileBtn = document.getElementById("importProfileBtn");
const profileImportMessage = document.getElementById("profileImportMessage");

const matchPercentage = document.getElementById("matchPercentage");
const matchProgress = document.getElementById("matchProgress");
const matchMessage = document.getElementById("matchMessage");

const matchingSkills = document.getElementById("matchingSkills");
const missingSkills = document.getElementById("missingSkills");

const resumeTips = document.getElementById("resumeTips");
const projectSuggestions = document.getElementById("projectSuggestions");
const nextSteps = document.getElementById("nextSteps");

const atsResults = document.getElementById("atsResults");
const resumePreview = document.getElementById("resumePreview");

const refreshPreviewBtn = document.getElementById("refreshPreviewBtn");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");
const printBtn = document.getElementById("printBtn");


/* =========================================
   COMMON SKILLS DATABASE
========================================= */

const skillDatabase = [

    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Bootstrap",
    "Tailwind CSS",
    "React",
    "Angular",
    "Vue",
    "Next.js",

    "Node.js",
    "Express.js",
    "PHP",
    "Python",
    "Java",
    "C",
    "C++",
    "C#",

    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "SQL",
    "Firebase",

    "Git",
    "GitHub",
    "REST API",
    "API",
    "JSON",

    "Data Structures",
    "Algorithms",
    "OOP",
    "DBMS",
    "Operating Systems",
    "Computer Networks",

    "Machine Learning",
    "Artificial Intelligence",
    "Data Analysis",

    "Figma",
    "WordPress",
    "Linux",
    "Docker",
    "AWS"
];


/* =========================================
   SKILL ALIASES
========================================= */

const skillAliases = {

    "HTML": ["HTML5"],

    "CSS": ["CSS3"],

    "JavaScript": ["JS", "ECMAScript"],

    "TypeScript": ["TS"],

    "Bootstrap": ["Bootstrap 5"],

    "React": ["React.js", "ReactJS"],

    "Angular": ["AngularJS"],

    "Vue": ["Vue.js", "VueJS"],

    "Node.js": ["NodeJS"],

    "Express.js": ["Express", "ExpressJS"],

    "PHP": [],

    "Python": [],

    "Java": [],

    "MySQL": [],

    "PostgreSQL": ["Postgres"],

    "MongoDB": ["Mongo DB"],

    "GitHub": ["Git Hub"],

    "REST API": ["RESTful API", "REST APIs"],

    "Data Structures": ["DSA", "Data Structure"],

    "OOP": ["Object Oriented Programming"],

    "DBMS": ["Database Management System"],

    "Artificial Intelligence": ["AI"],

    "Machine Learning": ["ML"]

};


/* =========================================
   TEXT HELPER FUNCTIONS
========================================= */

function getValue(element) {

    return element ? element.value.trim() : "";

}


function normalizeText(text) {

    return text
        .toLowerCase()
        .replace(/[^a-z0-9+#. ]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


function escapeHTML(value) {

    return String(value ?? "").replace(/[&<>"']/g, function(character) {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];

    });

}


function hasSkill(text, skill) {

    const normalizedText = normalizeText(text);

    const variations = [
        skill,
        ...(skillAliases[skill] || [])
    ];

    return variations.some(function(variation) {

        const normalizedSkill = normalizeText(variation);

        const escapedSkill = normalizedSkill.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        const regex = new RegExp(
            "(^| )" + escapedSkill + "( |$)",
            "i"
        );

        return regex.test(normalizedText);

    });

}


/* =========================================
   EXTRACT SKILLS FROM JOB DESCRIPTION
========================================= */

function extractJobSkills(description) {

    return skillDatabase.filter(function(skill) {

        return hasSkill(description, skill);

    });

}


/* =========================================
   EXTRACT STUDENT SKILLS
========================================= */

function extractStudentSkills() {

    const enteredSkills = getValue(studentSkills);

    return skillDatabase.filter(function(skill) {

        return hasSkill(enteredSkills, skill);

    });

}


/* =========================================
   DISPLAY SKILL TAGS
========================================= */

function displaySkills(container, skills, className, emptyMessage) {

    container.innerHTML = "";

    if (skills.length === 0) {

        container.innerHTML =
            `<span class="no-skill">${escapeHTML(emptyMessage)}</span>`;

        return;

    }

    skills.forEach(function(skill) {

        const tag = document.createElement("span");

        tag.className = "skill-tag " + className;

        tag.textContent = skill;

        container.appendChild(tag);

    });

}


/* =========================================
   RESUME MATCH ANALYSIS
========================================= */

function calculateMatch(jobSkills, userSkills) {

    const matching = jobSkills.filter(function(skill) {

        return userSkills.includes(skill);

    });

    const missing = jobSkills.filter(function(skill) {

        return !userSkills.includes(skill);

    });

    const percentage = jobSkills.length === 0
        ? 0
        : Math.round((matching.length / jobSkills.length) * 100);

    return {
        matching,
        missing,
        percentage
    };

}


/* =========================================
   DISPLAY MATCH SCORE
========================================= */

function displayMatch(result) {

    matchPercentage.textContent = result.percentage + "%";

    matchProgress.style.width = result.percentage + "%";

    if (result.percentage >= 75) {

        matchMessage.textContent =
            "Good match! Your skills match most of the identified job requirements.";

    } else if (result.percentage >= 40) {

        matchMessage.textContent =
            "Moderate match. Improve your resume by highlighting relevant experience and projects.";

    } else {

        matchMessage.textContent =
            "Your current skill match is low. Review the job requirements and your profile.";

    }

}


/* =========================================
   GENERATE RESUME IMPROVEMENT TIPS
========================================= */

function generateTips(result) {

    const tips = [];

    const summary = getValue(studentSummary);
    const projects = getValue(studentProjects);
    const experience = getValue(studentExperience);
    const certifications = getValue(studentCertifications);

    if (!summary) {

        tips.push(
            "Add a professional summary describing your education, strengths and career objective."
        );

    } else {

        tips.push(
            "Keep your professional summary short and relevant to the target job."
        );

    }


    if (result.matching.length > 0) {

        tips.push(
            "Highlight these matching skills near the top of your resume: " +
            result.matching.join(", ") + "."
        );

    }


    if (result.missing.length > 0) {

        tips.push(
            "Do not claim skills you do not have. Consider learning the missing skills and add them only after gaining practical knowledge."
        );

    }


    if (!projects) {

        tips.push(
            "Add academic or personal projects that demonstrate your technical abilities."
        );

    } else {

        tips.push(
            "Describe your projects with their purpose, technologies used and your actual contribution."
        );

    }


    if (!experience) {

        tips.push(
            "If you do not have work experience, highlight academic projects, practical work and relevant coursework."
        );

    }


    if (!certifications) {

        tips.push(
            "Add relevant certifications or completed courses if you have them."
        );

    }


    tips.push(
        "Use clear headings, simple formatting and action words in your resume."
    );


    resumeTips.innerHTML = "";

    tips.forEach(function(tip) {

        const li = document.createElement("li");

        li.textContent = tip;

        resumeTips.appendChild(li);

    });

}


/* =========================================
   PROJECT SUGGESTIONS
========================================= */

function generateProjectSuggestions(jobSkills) {

    projectSuggestions.innerHTML = "";

    const projectsText = getValue(studentProjects);

    if (!projectsText) {

        projectSuggestions.innerHTML =
            "<p class='no-skill'>No projects entered. Add your academic or personal projects.</p>";

        return;

    }

    const projects = projectsText
        .split(/\n+/)
        .map(item => item.trim())
        .filter(Boolean);

    let foundProject = false;

    projects.forEach(function(project, index) {

        const relevantSkills = jobSkills.filter(function(skill) {

            return hasSkill(project, skill);

        });

        const card = document.createElement("div");

        card.className = "project-suggestion-card";

        const heading = document.createElement("h6");

        heading.textContent = "Project " + (index + 1);

        const description = document.createElement("p");

        description.textContent = project;

        card.appendChild(heading);
        card.appendChild(description);

        if (relevantSkills.length > 0) {

            foundProject = true;

            const match = document.createElement("span");

            match.className = "project-match";

            match.textContent =
                "Relevant technologies: " + relevantSkills.join(", ");

            card.appendChild(match);

        } else {

            const note = document.createElement("span");

            note.className = "project-match";

            note.style.color = "#64748b";

            note.textContent =
                "Review this project and highlight any relevant contribution.";

            card.appendChild(note);

        }

        projectSuggestions.appendChild(card);

    });

    if (!foundProject) {

        const note = document.createElement("p");

        note.className = "no-skill";

        note.textContent =
            "No direct job-skill match was detected in your project descriptions. Add accurate technologies and contributions where applicable.";

        projectSuggestions.appendChild(note);

    }

}


/* =========================================
   NEXT STEPS
========================================= */

function generateNextSteps(result) {

    const steps = [

        "Review your resume information for accuracy.",

        "Highlight your relevant skills and projects.",

        "Use keywords from the job description naturally and truthfully.",

        "Check your resume using the ATS basic checker.",

        "Preview your resume before downloading it."

    ];

    if (result.missing.length > 0) {

        steps.splice(
            1,
            0,
            "Work on missing skills only if they are relevant to your career goal: " +
            result.missing.join(", ") + "."
        );

    }

    nextSteps.innerHTML = "";

    steps.forEach(function(step) {

        const li = document.createElement("li");

        li.textContent = step;

        nextSteps.appendChild(li);

    });

}


/* =========================================
   ATS BASIC CHECKER
========================================= */

function runATSChecker(jobSkills) {

    const checks = [];

    const name = getValue(studentName);
    const email = getValue(studentEmail);
    const phone = getValue(studentPhone);
    const summary = getValue(studentSummary);
    const educationValue = getValue(education);
    const skills = getValue(studentSkills);
    const projects = getValue(studentProjects);

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validPhone = phone.replace(/\D/g, "").length >= 10;

    checks.push({
        label: "Full name is provided",
        passed: name.length > 0
    });

    checks.push({
        label: "Valid email address",
        passed: validEmail
    });

    checks.push({
        label: "Contact number",
        passed: validPhone
    });

    checks.push({
        label: "Education details",
        passed: educationValue.length > 0
    });

    checks.push({
        label: "Professional summary",
        passed: summary.length >= 30
    });

    checks.push({
        label: "Technical skills",
        passed: skills.length > 0
    });

    checks.push({
        label: "Project information",
        passed: projects.length > 0
    });

    checks.push({
        label: "Relevant job keywords",
        passed: jobSkills.some(function(skill) {
            return hasSkill(skills, skill) || hasSkill(projects, skill);
        })
    });


    atsResults.innerHTML = "";

    let passedCount = 0;

    checks.forEach(function(check) {

        if (check.passed) {
            passedCount++;
        }

        const row = document.createElement("div");

        row.className = "ats-item";

        const label = document.createElement("span");

        label.textContent = check.label;

        const status = document.createElement("span");

        status.className =
            "ats-status " + (check.passed ? "pass" : "warning");

        status.textContent = check.passed ? "Passed" : "Needs Attention";

        row.appendChild(label);
        row.appendChild(status);

        atsResults.appendChild(row);

    });


    const score = Math.round((passedCount / checks.length) * 100);

    const summaryBox = document.createElement("p");

    summaryBox.style.fontWeight = "700";
    summaryBox.style.marginTop = "15px";

    summaryBox.textContent =
        "Basic ATS Checklist: " + score + "% (" +
        passedCount + " out of " + checks.length + " checks passed)";

    atsResults.appendChild(summaryBox);

}


/* =========================================
   GENERATE RESUME PREVIEW
========================================= */

function generateResumePreview() {

    const name = escapeHTML(getValue(studentName));
    const email = escapeHTML(getValue(studentEmail));
    const phone = escapeHTML(getValue(studentPhone));
    const location = escapeHTML(getValue(studentLocation));

    const summary = escapeHTML(getValue(studentSummary));
    const educationValue = escapeHTML(getValue(education));
    const skills = escapeHTML(getValue(studentSkills));

    const projects = escapeHTML(getValue(studentProjects));
    const experience = escapeHTML(getValue(studentExperience));
    const certifications = escapeHTML(getValue(studentCertifications));

    const contactDetails = [
        email,
        phone,
        location
    ].filter(Boolean).join(" | ");


    resumePreview.innerHTML = `

        <div class="resume-document">

            <header>

                <div class="resume-name">${name}</div>

                <div class="resume-contact">
                    ${contactDetails}
                </div>

            </header>


            ${summary ? `
                <section>

                    <h3>Professional Summary</h3>

                    <p>${summary}</p>

                </section>
            ` : ""}


            <section>

                <h3>Education</h3>

                <p>${educationValue}</p>

            </section>


            <section>

                <h3>Technical Skills</h3>

                <p class="resume-skills">${skills}</p>

            </section>


            ${projects ? `
                <section>

                    <h3>Projects</h3>

                    <p>${projects}</p>

                </section>
            ` : ""}


            ${experience ? `
                <section>

                    <h3>Internship / Work Experience</h3>

                    <p>${experience}</p>

                </section>
            ` : ""}


            ${certifications ? `
                <section>

                    <h3>Certifications</h3>

                    <p>${certifications}</p>

                </section>
            ` : ""}

        </div>

    `;

}


/* =========================================
   MAIN ANALYSIS FUNCTION
========================================= */

function analyzeResume() {

    const description = getValue(jobDescription);

    const jobSkills = extractJobSkills(description);

    const userSkills = extractStudentSkills();


    if (jobSkills.length === 0) {

        alert(
            "No supported technical skills were detected in the job description. Please enter recognizable skills such as HTML, CSS, JavaScript, React, PHP or MySQL."
        );

        return;

    }


    const result = calculateMatch(jobSkills, userSkills);


    /* Show result section */

    emptyResult.hidden = true;

    suggestionResult.hidden = false;


    /* Display match */

    displayMatch(result);


    /* Display matching skills */

    displaySkills(
        matchingSkills,
        result.matching,
        "matching-tag",
        "No matching skills found."
    );


    /* Display missing skills */

    displaySkills(
        missingSkills,
        result.missing,
        "missing-tag",
        "No missing skills detected."
    );


    /* Generate suggestions */

    generateTips(result);

    generateProjectSuggestions(jobSkills);

    generateNextSteps(result);


    /* ATS checker */

    runATSChecker(jobSkills);


    /* Generate resume preview */

    generateResumePreview();


    /* Scroll to results */

    document.getElementById("resultSection").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================
   FORM SUBMISSION
========================================= */

resumeForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!resumeForm.reportValidity()) {
        return;
    }

    analyzeResume();

});


/* =========================================
   PROFILE INFORMATION IMPORT
========================================= */

function readProfileFromStorage() {

    const possibleKeys = [

        "userProfile",
        "profileData",
        "studentProfile",
        "userData",
        "studentData",
        "currentUser",
        "loggedInUser"

    ];

    for (const key of possibleKeys) {

        const storedData = localStorage.getItem(key);

        if (!storedData) {
            continue;
        }

        try {

            const parsedData = JSON.parse(storedData);

            if (parsedData && typeof parsedData === "object") {

                return parsedData;

            }

        } catch (error) {

            console.warn("Could not read profile key:", key);

        }

    }

    return null;

}


function findProfileValue(profile, possibleNames) {

    if (!profile || typeof profile !== "object") {
        return "";
    }

    const normalizedNames = possibleNames.map(function(name) {

        return name.toLowerCase().replace(/[^a-z0-9]/g, "");

    });


    for (const [key, value] of Object.entries(profile)) {

        const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");

        if (
            normalizedNames.includes(normalizedKey) &&
            typeof value === "string"
        ) {

            return value;

        }

    }

    return "";

}


function importProfileInformation() {

    const profile = readProfileFromStorage();

    if (!profile) {

        profileImportMessage.textContent =
            "No saved profile data found. Please check your profile page storage.";

        profileImportMessage.className = "input-message error";

        return;

    }


    /*
       If your profile object contains nested user details,
       this function also checks common nested objects.
    */

    const profileSources = [

        profile,

        profile.user,

        profile.student,

        profile.profile,

        profile.personalInfo,

        profile.personalDetails

    ].filter(function(item) {

        return item && typeof item === "object";

    });


    function getProfileField(names) {

        for (const source of profileSources) {

            const value = findProfileValue(source, names);

            if (value) {
                return value;
            }

        }

        return "";

    }


    const imported = {

        name: getProfileField([
            "name",
            "fullName",
            "studentName",
            "username"
        ]),

        email: getProfileField([
            "email",
            "emailAddress"
        ]),

        phone: getProfileField([
            "phone",
            "phoneNumber",
            "mobile",
            "mobileNumber"
        ]),

        location: getProfileField([
            "location",
            "city",
            "address"
        ]),

        education: getProfileField([
            "education",
            "qualification",
            "degree",
            "academicDetails"
        ]),

        summary: getProfileField([
            "summary",
            "professionalSummary",
            "about",
            "bio"
        ]),

        skills: getProfileField([
            "skills",
            "technicalSkills"
        ]),

        projects: getProfileField([
            "projects",
            "myProjects",
            "projectDetails"
        ]),

        experience: getProfileField([
            "experience",
            "workExperience",
            "internship"
        ]),

        certifications: getProfileField([
            "certifications",
            "certificates"
        ])

    };


    /*
       Convert array values to readable text.
    */

    Object.keys(imported).forEach(function(key) {

        const possibleArray = imported[key];

        if (Array.isArray(possibleArray)) {

            imported[key] = possibleArray.map(function(item) {

                if (typeof item === "string") {
                    return item;
                }

                if (item && typeof item === "object") {

                    return Object.values(item)
                        .filter(value => typeof value === "string")
                        .join(" - ");

                }

                return "";

            }).filter(Boolean).join("\n");

        }

    });


    let importedCount = 0;


    function fillIfEmpty(element, value) {

        if (element && value && !element.value.trim()) {

            element.value = value;

            importedCount++;

        }

    }


    fillIfEmpty(studentName, imported.name);
    fillIfEmpty(studentEmail, imported.email);
    fillIfEmpty(studentPhone, imported.phone);
    fillIfEmpty(studentLocation, imported.location);

    fillIfEmpty(education, imported.education);
    fillIfEmpty(studentSummary, imported.summary);

    fillIfEmpty(studentSkills, imported.skills);
    fillIfEmpty(studentProjects, imported.projects);

    fillIfEmpty(studentExperience, imported.experience);
    fillIfEmpty(studentCertifications, imported.certifications);


    if (importedCount > 0) {

        profileImportMessage.textContent =
            importedCount + " profile field(s) imported successfully.";

        profileImportMessage.className = "input-message success";

    } else {

        profileImportMessage.textContent =
            "Profile data was found, but no matching empty fields could be filled. Check your profile data structure.";

        profileImportMessage.className = "input-message error";

    }

}


importProfileBtn.addEventListener("click", importProfileInformation);


/* =========================================
   UPDATE RESUME PREVIEW
========================================= */

refreshPreviewBtn.addEventListener("click", function() {

    if (!getValue(studentName) || !getValue(studentEmail)) {

        alert("Please enter your name and email before updating the preview.");

        return;

    }

    generateResumePreview();

    alert("Resume preview updated successfully.");

});


/* =========================================
   DOWNLOAD RESUME AS PDF
========================================= */

downloadPdfBtn.addEventListener("click", function() {

    if (!getValue(studentName) || !getValue(studentEmail)) {

        alert("Please enter your name and email before downloading the resume.");

        return;

    }


    if (!window.html2pdf) {

        alert(
            "PDF library could not load. Please check your internet connection and try again."
        );

        return;

    }


    generateResumePreview();


    const resumeElement = resumePreview.querySelector(".resume-document");

    if (!resumeElement) {
        alert("Resume preview could not be generated.");
        return;
    }


    const safeName = getValue(studentName)
        .replace(/[^a-z0-9]/gi, "_");


    const options = {

        margin: 10,

        filename: (safeName || "Student") + "_Resume.pdf",

        image: {
            type: "jpeg",
            quality: 0.98
        },

        html2canvas: {
            scale: 2,
            useCORS: true
        },

        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait"
        }

    };


    downloadPdfBtn.disabled = true;

    downloadPdfBtn.innerHTML =
        '<i class="bi bi-hourglass-split"></i> Generating PDF...';


    window.html2pdf()
        .set(options)
        .from(resumeElement)
        .save()
        .then(function() {

            alert("Your resume PDF has been downloaded successfully.");

        })
        .catch(function(error) {

            console.error("PDF Error:", error);

            alert("Unable to generate PDF. Please try again.");

        })
        .finally(function() {

            downloadPdfBtn.disabled = false;

            downloadPdfBtn.innerHTML =
                '<i class="bi bi-file-earmark-pdf"></i> Download PDF';

        });

});


/* =========================================
   PRINT RESUME
========================================= */

printBtn.addEventListener("click", function() {

    generateResumePreview();

    window.print();

});


/* =========================================
   RESET FORM
========================================= */

resumeForm.addEventListener("reset", function() {

    setTimeout(function() {

        emptyResult.hidden = false;

        suggestionResult.hidden = true;

        profileImportMessage.textContent = "";

        profileImportMessage.className = "input-message";

        resumePreview.innerHTML = `

            <div class="preview-placeholder">

                <i class="bi bi-file-earmark-person"></i>

                <h6>Resume Preview</h6>

                <p>Your generated resume will appear here.</p>

            </div>

        `;

    }, 0);

});


/* =========================================
   SIDEBAR MENU
========================================= */

const sidebar = document.getElementById("sidebar");

const menuToggle = document.getElementById("menuToggle");


menuToggle.addEventListener("click", function() {

    sidebar.classList.toggle("active");

});


/* =========================================
   LOGOUT
========================================= */

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function(event) {

    event.preventDefault();

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        window.location.href = "login.html";

    }

});


/* =========================================
   LOAD USER NAME IN TOPBAR
========================================= */

const topUserName = document.getElementById("topUserName");

const userAvatar = document.getElementById("userAvatar");


const savedProfile = readProfileFromStorage();

if (savedProfile) {

    const savedName =
        findProfileValue(savedProfile, [
            "name",
            "fullName",
            "studentName",
            "username"
        ]);

    if (savedName) {

        topUserName.textContent = savedName;

        userAvatar.textContent = savedName.charAt(0).toUpperCase();

    }

}

function runATSChecker() {

    const getValue = id =>
        document.getElementById(id).value.trim();

    const name = getValue("studentName");
    const email = getValue("studentEmail");
    const phone = getValue("studentPhone");
    const education = getValue("education");
    const skills = getValue("studentSkills");
    const projects = getValue("studentProjects");
    const experience = getValue("studentExperience");
    const summary = getValue("studentSummary");
    const job = getValue("jobDescription");

    const resume = [
        name, email, phone, education,
        skills, projects, experience, summary
    ].join(" ").toLowerCase();

    const results = [];

    // 1. Contact Information
    const contact =
        name.length >= 3 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
        phone.replace(/\D/g, "").length >= 10;

    results.push({
        title: "Contact Information",
        passed: contact,
        message: contact
            ? "Contact details are valid."
            : "Check your name, email and phone number."
    });

    // 2. Resume Sections
    const sections = [
        education, skills, projects, experience
    ];

    const completed = sections.filter(x => x.length > 0).length;

    results.push({
        title: "Resume Sections",
        passed: completed >= 3,
        message: `${completed}/4 important sections completed.`
    });

    // 3. Keyword Matching
    const stopWords = new Set([
        "the", "and", "for", "with", "you",
        "are", "this", "that", "will", "from",
        "your", "our", "have", "has", "job",
        "work", "role", "skills", "experience"
    ]);

    const keywords = [...new Set(
        job.toLowerCase().match(/\b[a-z][a-z0-9+#.-]*\b/g) || []
    )].filter(word => word.length > 2 && !stopWords.has(word));

    const matched = keywords.filter(word =>
        resume.includes(word)
    );

    const missing = keywords.filter(word =>
        !matched.includes(word)
    );

    const keywordScore = keywords.length
        ? Math.round(matched.length / keywords.length * 100)
        : 0;

    results.push({
        title: "Keyword Matching",
        passed: keywordScore >= 60,
        message: `${keywordScore}% keywords matched.`
    });

    // 4. Technical Skills
    const skillList = skills.split(/[,;\n]+/)
        .map(x => x.trim())
        .filter(Boolean);

    const matchedSkills = skillList.filter(skill =>
        job.toLowerCase().includes(skill.toLowerCase())
    );

    results.push({
        title: "Technical Skills",
        passed: matchedSkills.length > 0,
        message: `${matchedSkills.length}/${skillList.length} entered skills match the job.`
    });

    // 5. Action Verbs
    const verbs = [
        "developed", "created", "designed",
        "implemented", "managed", "built",
        "improved", "analyzed", "tested",
        "maintained", "deployed"
    ];

    const foundVerbs = verbs.filter(verb =>
        new RegExp("\\b" + verb + "\\b", "i").test(resume)
    );

    results.push({
        title: "Action Verbs & Content Quality",
        passed: foundVerbs.length >= 3,
        message: `${foundVerbs.length} professional action verbs detected.`
    });

    // Final Score
    const score = Math.round(
        results.filter(x => x.passed).length /
        results.length * 100
    );

    // Display Results
    const output = document.getElementById("atsResults");

    output.innerHTML = `
        <div class="ats-score-card">
            <h4>ATS Compatibility Score</h4>
            <h2>${score}/100</h2>
            <div class="progress">
                <div class="progress-bar"
                     style="width:${score}%"></div>
            </div>
        </div>

        <h5 class="mt-4">Detailed Analysis</h5>

        ${results.map(item => `
            <div class="ats-check-item">
                <strong>${item.title}</strong>
                <span class="badge bg-${item.passed ? "success" : "warning"}">
                    ${item.passed ? "Passed" : "Needs Improvement"}
                </span>
                <p>${item.message}</p>
            </div>
        `).join("")}

        <h5 class="mt-4">Missing Job Keywords</h5>
        <p>${missing.length ? missing.join(", ") : "No missing keywords detected."}</p>

        <h5>Matching Technical Skills</h5>
        <p>${matchedSkills.join(", ") || "No matching skills detected."}</p>

        <div class="alert alert-info mt-3">
            This is a basic rule-based ATS estimate,
            not an actual employer ATS result.
        </div>
    `;
}
