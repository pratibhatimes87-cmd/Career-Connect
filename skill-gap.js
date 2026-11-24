
// ==========================================
// CAREERCONNECT - SKILL GAP ANALYSIS
// ==========================================


// Job Role Skill Database

const jobDatabase = {

    frontend: {

        name: "Frontend Developer",

        skills: [

            {
                name: "HTML",
                priority: "High",
                beginner: "Learn HTML elements, headings, links, images and forms.",
                intermediate: "Learn semantic HTML, tables and form validation.",
                advanced: "Learn accessibility, SEO-friendly HTML and advanced forms.",
                resource: "https://developer.mozilla.org/en-US/docs/Web/HTML",
                resourceName: "MDN HTML Documentation",
                tasks: [
                    "Create a personal webpage using HTML.",
                    "Create a registration form with different input fields.",
                    "Build a semantic multi-section webpage."
                ]
            },

            {
                name: "CSS",
                priority: "High",
                beginner: "Learn selectors, colors, fonts, margins and padding.",
                intermediate: "Learn Flexbox, Grid, positioning and responsive design.",
                advanced: "Learn animations, transitions and advanced layouts.",
                resource: "https://developer.mozilla.org/en-US/docs/Web/CSS",
                resourceName: "MDN CSS Documentation",
                tasks: [
                    "Design a styled login page.",
                    "Create a responsive navigation bar.",
                    "Build a responsive landing page using Flexbox and Grid."
                ]
            },

            {
                name: "JavaScript",
                priority: "High",
                beginner: "Learn variables, data types, operators and conditions.",
                intermediate: "Learn functions, arrays, objects and DOM manipulation.",
                advanced: "Learn asynchronous JavaScript, promises and API integration.",
                resource: "https://javascript.info/",
                resourceName: "JavaScript.info",
                tasks: [
                    "Create an even and odd number checker.",
                    "Build a calculator using JavaScript.",
                    "Create a task manager using DOM and localStorage."
                ]
            },

            {
                name: "Bootstrap",
                priority: "Medium",
                beginner: "Learn Bootstrap containers, rows and columns.",
                intermediate: "Learn cards, forms, buttons and responsive utilities.",
                advanced: "Build complete responsive interfaces using Bootstrap components.",
                resource: "https://getbootstrap.com/docs/5.3/",
                resourceName: "Bootstrap Documentation",
                tasks: [
                    "Create a responsive two-column layout.",
                    "Build a registration form using Bootstrap.",
                    "Create a responsive student dashboard."
                ]
            },

            {
                name: "React",
                priority: "High",
                beginner: "Learn components, JSX and props.",
                intermediate: "Learn state, events, hooks and component communication.",
                advanced: "Learn routing, API integration and application optimization.",
                resource: "https://react.dev/learn",
                resourceName: "React Official Tutorial",
                tasks: [
                    "Create your first React component.",
                    "Build a counter and a to-do application.",
                    "Create a React application that fetches API data."
                ]
            },

            {
                name: "Git & GitHub",
                priority: "Medium",
                beginner: "Understand repositories and basic Git commands.",
                intermediate: "Learn branches, commits and pull requests.",
                advanced: "Practice collaboration and version control workflows.",
                resource: "https://docs.github.com/en/get-started",
                resourceName: "GitHub Learning Guide",
                tasks: [
                    "Create your GitHub account and repository.",
                    "Upload a personal project to GitHub.",
                    "Create a branch and merge your changes."
                ]
            }

        ]

    },


    backend: {

        name: "Backend Developer",

        skills: [

            {
                name: "Python",
                priority: "High",
                beginner: "Learn variables, data types, loops and conditions.",
                intermediate: "Learn functions, OOP, modules and file handling.",
                advanced: "Learn exception handling and application development.",
                resource: "https://docs.python.org/3/tutorial/",
                resourceName: "Python Official Tutorial",
                tasks: [
                    "Create a simple calculator.",
                    "Build a student record management program.",
                    "Create a file handling application."
                ]
            },

            {
                name: "SQL",
                priority: "High",
                beginner: "Learn tables, records and basic SQL queries.",
                intermediate: "Learn joins, grouping, subqueries and constraints.",
                advanced: "Learn indexing, normalization and query optimization.",
                resource: "https://www.w3schools.com/sql/",
                resourceName: "W3Schools SQL Tutorial",
                tasks: [
                    "Create a student database.",
                    "Write SQL queries using JOIN.",
                    "Create a database with multiple related tables."
                ]
            },

            {
                name: "Node.js",
                priority: "High",
                beginner: "Understand Node.js and its basic modules.",
                intermediate: "Learn npm, file system and asynchronous programming.",
                advanced: "Build server-side applications and handle errors.",
                resource: "https://nodejs.org/en/learn",
                resourceName: "Node.js Learning Resources",
                tasks: [
                    "Run your first Node.js program.",
                    "Create a simple HTTP server.",
                    "Build a basic backend application."
                ]
            },

            {
                name: "Express.js",
                priority: "High",
                beginner: "Understand Express and create a basic server.",
                intermediate: "Learn routes, middleware and request handling.",
                advanced: "Build structured REST APIs with error handling.",
                resource: "https://expressjs.com/en/starter/installing.html",
                resourceName: "Express.js Documentation",
                tasks: [
                    "Create a basic Express server.",
                    "Build CRUD routes.",
                    "Create a REST API for student records."
                ]
            },

            {
                name: "MongoDB",
                priority: "Medium",
                beginner: "Learn databases, collections and documents.",
                intermediate: "Learn CRUD operations and queries.",
                advanced: "Learn aggregation and database relationships.",
                resource: "https://www.mongodb.com/docs/manual/",
                resourceName: "MongoDB Documentation",
                tasks: [
                    "Create a database and collection.",
                    "Perform CRUD operations.",
                    "Build a small application using MongoDB."
                ]
            },

            {
                name: "Git & GitHub",
                priority: "Medium",
                beginner: "Learn repositories and basic commands.",
                intermediate: "Practice branches and commits.",
                advanced: "Learn collaboration and pull requests.",
                resource: "https://docs.github.com/en/get-started",
                resourceName: "GitHub Learning Guide",
                tasks: [
                    "Create a GitHub repository.",
                    "Upload your backend project.",
                    "Practice branching and merging."
                ]
            }

        ]

    },


    fullstack: {

        name: "Full Stack Developer",

        skills: [

            {
                name: "HTML",
                priority: "High",
                beginner: "Learn HTML elements and structure.",
                intermediate: "Learn semantic HTML and forms.",
                advanced: "Learn accessibility and SEO-friendly structure.",
                resource: "https://developer.mozilla.org/en-US/docs/Web/HTML",
                resourceName: "MDN HTML Documentation",
                tasks: [
                    "Create a personal webpage.",
                    "Build a registration form.",
                    "Create a semantic website."
                ]
            },

            {
                name: "CSS",
                priority: "High",
                beginner: "Learn selectors and basic styling.",
                intermediate: "Learn Flexbox, Grid and responsive design.",
                advanced: "Learn animations and complex layouts.",
                resource: "https://developer.mozilla.org/en-US/docs/Web/CSS",
                resourceName: "MDN CSS Documentation",
                tasks: [
                    "Design a login page.",
                    "Create a responsive layout.",
                    "Build a complete responsive website."
                ]
            },

            {
                name: "JavaScript",
                priority: "High",
                beginner: "Learn variables, operators and conditions.",
                intermediate: "Learn functions, arrays, objects and DOM.",
                advanced: "Learn APIs, promises and asynchronous programming.",
                resource: "https://javascript.info/",
                resourceName: "JavaScript.info",
                tasks: [
                    "Create a calculator.",
                    "Build a form validation system.",
                    "Create an application using an API."
                ]
            },

            {
                name: "React",
                priority: "High",
                beginner: "Learn JSX, components and props.",
                intermediate: "Learn hooks and state management.",
                advanced: "Learn routing and API integration.",
                resource: "https://react.dev/learn",
                resourceName: "React Official Tutorial",
                tasks: [
                    "Create a React component.",
                    "Build a to-do application.",
                    "Create a React dashboard."
                ]
            },

            {
                name: "Node.js",
                priority: "High",
                beginner: "Understand Node.js fundamentals.",
                intermediate: "Learn modules and asynchronous programming.",
                advanced: "Build backend applications.",
                resource: "https://nodejs.org/en/learn",
                resourceName: "Node.js Learning Resources",
                tasks: [
                    "Write a Node.js program.",
                    "Create an HTTP server.",
                    "Build a backend service."
                ]
            },

            {
                name: "Express.js",
                priority: "High",
                beginner: "Learn Express setup and routing.",
                intermediate: "Learn middleware and CRUD operations.",
                advanced: "Build REST APIs with authentication.",
                resource: "https://expressjs.com/",
                resourceName: "Express.js Documentation",
                tasks: [
                    "Create an Express server.",
                    "Build CRUD APIs.",
                    "Create an authentication API."
                ]
            },

            {
                name: "SQL",
                priority: "Medium",
                beginner: "Learn tables and basic queries.",
                intermediate: "Learn joins and subqueries.",
                advanced: "Learn normalization and optimization.",
                resource: "https://www.w3schools.com/sql/",
                resourceName: "W3Schools SQL Tutorial",
                tasks: [
                    "Create a database.",
                    "Write JOIN queries.",
                    "Design a relational database."
                ]
            },

            {
                name: "Git & GitHub",
                priority: "Medium",
                beginner: "Learn Git basics.",
                intermediate: "Learn branches and commits.",
                advanced: "Practice team collaboration.",
                resource: "https://docs.github.com/en/get-started",
                resourceName: "GitHub Learning Guide",
                tasks: [
                    "Create a repository.",
                    "Upload a project.",
                    "Practice branches and merging."
                ]
            }

        ]

    }

};


// ==========================================
// DOM ELEMENTS
// ==========================================

const jobSelect = document.getElementById("jobSelect");
const mySkills = document.getElementById("mySkills");
const analyzeBtn = document.getElementById("analyzeBtn");

let currentRole = "";


// ==========================================
// SIDEBAR
// ==========================================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

if (menuBtn && sidebar) {

    menuBtn.addEventListener("click", function() {
        sidebar.classList.toggle("show");
    });

}


// ==========================================
// SKILL NORMALIZATION
// ==========================================

function normalizeSkill(skill) {

    let value = skill.toLowerCase().trim();

    const aliases = {
        "js": "javascript",
        "javascript": "javascript",
        "html5": "html",
        "css3": "css",
        "react.js": "react",
        "reactjs": "react",
        "node.js": "node.js",
        "nodejs": "node.js",
        "express": "express.js",
        "expressjs": "express.js",
        "github": "git & github",
        "git": "git & github",
        "mongodb": "mongodb",
        "mysql": "sql",
        "postgresql": "sql"
    };

    return aliases[value] || value;
}


// ==========================================
// GET USER SKILLS
// ==========================================

function getUserSkills() {

    return [...new Set(

        mySkills.value
            .split(/[,;\n]+/)
            .map(skill => skill.trim())
            .filter(skill => skill.length > 0)
            .map(normalizeSkill)

    )];

}


// ==========================================
// ANALYZE SKILLS
// ==========================================

analyzeBtn.addEventListener("click", analyzeSkills);


function analyzeSkills() {

    const role = jobSelect.value;
    const userSkills = getUserSkills();

    const inputMessage = document.getElementById("inputMessage");

    if (!role) {

        inputMessage.textContent = "Please select a target job role.";
        inputMessage.className = "input-message error-message";

        return;
    }

    if (userSkills.length === 0) {

        inputMessage.textContent = "Please enter your existing technical skills.";
        inputMessage.className = "input-message error-message";

        return;
    }

    inputMessage.textContent = "Skills analyzed successfully.";
    inputMessage.className = "input-message success-message";

    currentRole = role;

    const job = jobDatabase[role];

    const matched = job.skills.filter(skill =>
        userSkills.includes(normalizeSkill(skill.name))
    );

    const missing = job.skills.filter(skill =>
        !userSkills.includes(normalizeSkill(skill.name))
    );

    const score = Math.round(
        (matched.length / job.skills.length) * 100
    );

    // Skill Match

    document.getElementById("matchPercentage").textContent =
        score + "%";

    document.getElementById("matchCircle").style.setProperty(
        "--percentage",
        score + "%"
    );

    document.getElementById("matchTitle").textContent =
        job.name;

    document.getElementById("matchDescription").textContent =
        `${matched.length} out of ${job.skills.length} required skills matched. You have ${missing.length} skills to learn.`;


    // Existing and Missing Skills

    displaySkillList("existingSkills", matched, "existing-tag");

    displaySkillList("missingSkills", missing, "missing-tag");


    // Priority

    displayPriority(missing);


    // Learning Roadmap

    displayRoadmap(missing);


    // Resources

    displayResources(missing);


    // Practice Tasks

    displayPracticeTasks(missing);


    // Progress

    updateProgress();

}


// ==========================================
// DISPLAY SKILL LIST
// ==========================================

function displaySkillList(elementId, skills, className) {

    const container = document.getElementById(elementId);

    container.innerHTML = "";

    if (skills.length === 0) {

        container.textContent = "No skills found.";

        return;
    }

    skills.forEach(skill => {

        const span = document.createElement("span");

        span.className = `skill-tag ${className}`;

        span.textContent = skill.name;

        container.appendChild(span);

    });

}


// ==========================================
// SKILL PRIORITY
// ==========================================

function displayPriority(skills) {

    const container = document.getElementById("prioritySkills");

    container.innerHTML = "";

    if (skills.length === 0) {

        container.textContent =
            "Excellent! No missing skills in this skill list.";

        return;
    }

    const order = {
        "High": 1,
        "Medium": 2,
        "Low": 3
    };

    const sorted = [...skills].sort((a, b) =>
        order[a.priority] - order[b.priority]
    );

    sorted.forEach(skill => {

        const card = document.createElement("div");

        card.className = "priority-card";

        const heading = document.createElement("div");
        heading.className = "priority-heading";

        const name = document.createElement("h6");
        name.textContent = skill.name;

        const badge = document.createElement("span");
        badge.textContent = skill.priority + " Priority";
        badge.className =
            "priority-badge " + skill.priority.toLowerCase();

        heading.append(name, badge);

        const description = document.createElement("p");
        description.textContent = skill.beginner;

        card.append(heading, description);

        container.appendChild(card);

    });

}


// ==========================================
// LEARNING ROADMAP
// ==========================================

function displayRoadmap(skills) {

    const container = document.getElementById("learningRoadmap");

    container.innerHTML = "";

    if (skills.length === 0) {

        container.textContent =
            "You already have all the skills listed for this role.";

        return;
    }

    skills.forEach((skill, index) => {

        const card = document.createElement("div");

        card.className = "roadmap-card";

        const title = document.createElement("h6");

        title.textContent =
            `${index + 1}. ${skill.name}`;

        card.appendChild(title);

        const levels = [
            {
                name: "Beginner",
                description: skill.beginner
            },
            {
                name: "Intermediate",
                description: skill.intermediate
            },
            {
                name: "Advanced",
                description: skill.advanced
            }
        ];

        levels.forEach(level => {

            const item = document.createElement("div");

            item.className = "roadmap-level";

            const heading = document.createElement("strong");
            heading.textContent = level.name;

            const text = document.createElement("p");
            text.textContent = level.description;

            item.append(heading, text);

            card.appendChild(item);

        });

        container.appendChild(card);

    });

}


// ==========================================
// LEARNING RESOURCES
// ==========================================

function displayResources(skills) {

    const container = document.getElementById("learningResources");

    container.innerHTML = "";

    if (skills.length === 0) {

        container.textContent = "No additional resources required.";

        return;
    }

    skills.forEach(skill => {

        const card = document.createElement("div");

        card.className = "resource-card";

        const title = document.createElement("h6");
        title.textContent = skill.name;

        const link = document.createElement("a");

        link.href = skill.resource;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = skill.resourceName;

        const icon = document.createElement("i");
        icon.className = "bi bi-box-arrow-up-right";

        link.appendChild(icon);

        card.append(title, link);

        container.appendChild(card);

    });

}


// ==========================================
// PRACTICE TASKS
// ==========================================

function getProgressKey() {

    return "careerconnect_progress_" + currentRole;

}


function getSavedProgress() {

    try {

        return JSON.parse(
            localStorage.getItem(getProgressKey())
        ) || {};

    } catch (error) {

        return {};

    }

}


function saveProgress(progress) {

    localStorage.setItem(
        getProgressKey(),
        JSON.stringify(progress)
    );

}


function displayPracticeTasks(skills) {

    const container = document.getElementById("practiceTasks");

    container.innerHTML = "";

    if (skills.length === 0) {

        container.textContent = "No pending practice tasks.";

        return;
    }

    const saved = getSavedProgress();

    skills.forEach(skill => {

        const section = document.createElement("div");

        section.className = "practice-skill";

        const title = document.createElement("h6");

        title.textContent = skill.name;

        section.appendChild(title);

        skill.tasks.forEach((task, index) => {

            const taskId =
                normalizeSkill(skill.name) + "_" + index;

            const row = document.createElement("label");

            row.className = "practice-task";

            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";

            checkbox.checked = saved[taskId] === true;

            const text = document.createElement("span");

            text.textContent = task;

            checkbox.addEventListener("change", function() {

                const progress = getSavedProgress();

                progress[taskId] = checkbox.checked;

                saveProgress(progress);

                updateProgress();

            });

            row.append(checkbox, text);

            section.appendChild(row);

        });

        container.appendChild(section);

    });

}


// ==========================================
// UPDATE LEARNING PROGRESS
// ==========================================

function updateProgress() {

    if (!currentRole) {
        return;
    }

    const skills = jobDatabase[currentRole].skills;

    const missing = skills.filter(skill =>
        !getUserSkills().includes(normalizeSkill(skill.name))
    );

    const progress = getSavedProgress();

    const totalTasks = missing.reduce(
        (total, skill) => total + skill.tasks.length,
        0
    );

    const completedTasks = missing.reduce(
        (total, skill) => {

            return total + skill.tasks.filter((task, index) => {

                const key = normalizeSkill(skill.name) + "_" + index;

                return progress[key] === true;

            }).length;

        },
        0
    );

    const percentage = totalTasks === 0
        ? 100
        : Math.round((completedTasks / totalTasks) * 100);


    document.getElementById("progressPercentage").textContent =
        percentage + "%";

    document.getElementById("learningProgressBar").style.width =
        percentage + "%";

    document.getElementById("progressCount").textContent =
        `${completedTasks} of ${totalTasks} tasks completed`;

    document.getElementById("progressText").textContent =
        percentage === 100
            ? "Excellent! You have completed all the listed practice tasks."
            : "Keep practicing and complete your learning tasks to improve your skills.";

}


// ==========================================
// RESET PROGRESS
// ==========================================

document.getElementById("resetProgressBtn")
.addEventListener("click", function() {

    if (!currentRole) {

        alert("Please analyze a job role first.");

        return;
    }

    const confirmReset = confirm(
        "Are you sure you want to reset your learning progress?"
    );

    if (confirmReset) {

        localStorage.removeItem(getProgressKey());

        displayPracticeTasks(
            jobDatabase[currentRole].skills.filter(skill =>
                !getUserSkills().includes(normalizeSkill(skill.name))
            )
        );

        updateProgress();

        alert("Your learning progress has been reset.");

    }

});
