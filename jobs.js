
// Sample Job Data
// These are demo listings, not verified live vacancies.

const jobs = [

    {
        id: 1,
        title: "Web Development Intern",
        company: "ABC Technologies",
        location: "Jaipur",
        type: "Internship",
        mode: "Remote",
        category: "Web Development",
        salary: 8000,
        salaryText: "₹8,000 / month",
        deadline: "2026-12-30",
        skills: ["HTML", "CSS", "JavaScript", "React"],
        description: "Work on website development and learn frontend technologies with a development team."
    },

    {
        id: 2,
        title: "Junior Web Developer",
        company: "Tech Solutions",
        location: "Jodhpur",
        type: "Full Time",
        mode: "On-site",
        category: "Web Development",
        salary: 25000,
        salaryText: "₹3 LPA",
        deadline: "2027-01-15",
        skills: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        description: "Develop and maintain websites using frontend and backend technologies."
    },

    {
        id: 3,
        title: "Frontend Developer Intern",
        company: "Creative Web Studio",
        location: "Remote",
        type: "Internship",
        mode: "Remote",
        category: "Web Development",
        salary: 6000,
        salaryText: "₹6,000 / month",
        deadline: "2026-12-20",
        skills: ["HTML", "CSS", "Bootstrap", "JavaScript"],
        description: "Assist in designing responsive websites and improving user interfaces."
    },

    {
        id: 4,
        title: "Software Developer Trainee",
        company: "Digital Systems",
        location: "Jaipur",
        type: "Full Time",
        mode: "Hybrid",
        category: "Software Development",
        salary: 30000,
        salaryText: "₹3.6 LPA",
        deadline: "2027-01-10",
        skills: ["Java", "Python", "OOP", "SQL"],
        description: "Work with the software development team on application development."
    },

    {
        id: 5,
        title: "Network Support Intern",
        company: "Network India",
        location: "Jodhpur",
        type: "Internship",
        mode: "On-site",
        category: "Networking",
        salary: 5000,
        salaryText: "₹5,000 / month",
        deadline: "2026-12-25",
        skills: ["Networking", "CCNA", "TCP/IP", "Linux"],
        description: "Learn network troubleshooting, configuration and basic network administration."
    },

    {
        id: 6,
        title: "Database Assistant",
        company: "Data Services",
        location: "Remote",
        type: "Part Time",
        mode: "Remote",
        category: "Data",
        salary: 10000,
        salaryText: "₹10,000 / month",
        deadline: "2027-01-05",
        skills: ["SQL", "MySQL", "DBMS", "Excel"],
        description: "Assist with database management, SQL queries and data organization."
    }

];


// HTML Elements

const jobList = document.getElementById("jobList");
const searchInput = document.getElementById("searchInput");
const locationInput = document.getElementById("locationInput");

const typeFilter = document.getElementById("typeFilter");
const workFilter = document.getElementById("workFilter");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

const resultCount = document.getElementById("resultCount");
const noJobs = document.getElementById("noJobs");


// Saved and applied job data

let savedJobs = JSON.parse(
    localStorage.getItem("careerConnectSavedJobs") || "[]"
);

let appliedJobs = JSON.parse(
    localStorage.getItem("careerConnectApplications") || "[]"
);

let selectedCategory = "All";


// Display Jobs

function displayJobs(jobArray) {

    jobList.innerHTML = "";

    resultCount.textContent =
        `Showing ${jobArray.length} opportunities`;

    noJobs.hidden = jobArray.length !== 0;

    jobArray.forEach(job => {

        const isSaved = savedJobs.includes(job.id);

        const isApplied = appliedJobs.some(
            application => application.jobId === job.id
        );

        const card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `

            <div class="job-top">

                <div class="d-flex gap-3">

                    <div class="company-logo">
                        <i class="bi bi-building"></i>
                    </div>

                    <div>
                        <h5 class="job-title">${job.title}</h5>
                        <p class="company-name">${job.company}</p>
                    </div>

                </div>

                <button class="save-btn ${isSaved ? "saved" : ""}"
                        data-save="${job.id}"
                        title="Save Job">

                    <i class="bi ${isSaved ? "bi-bookmark-fill" : "bi-bookmark"}"></i>

                </button>

            </div>


            <div class="job-details">

                <span><i class="bi bi-geo-alt"></i>${job.location}</span>

                <span><i class="bi bi-clock"></i>${job.type}</span>

                <span><i class="bi bi-house"></i>${job.mode}</span>

                <span><i class="bi bi-cash"></i>${job.salaryText}</span>

            </div>


            <p class="job-description">${job.description}</p>


            <div class="job-skills">

                ${job.skills.map(skill =>
                    `<span class="job-skill">${skill}</span>`
                ).join("")}

            </div>


            <div class="job-bottom">

                <span class="deadline">
                    <i class="bi bi-calendar-event"></i>
                    Deadline: ${formatDate(job.deadline)}
                </span>

                <div class="job-actions">

                    <button class="details-btn"
                            data-details="${job.id}">
                        View Details
                    </button>

                    <button class="apply-btn"
                            data-apply="${job.id}"
                            ${isApplied ? "disabled" : ""}>
                        ${isApplied ? "Applied" : "Apply Now"}
                    </button>

                </div>

            </div>

        `;

        jobList.appendChild(card);

    });

}


// Date Format

function formatDate(date) {

    return new Date(date + "T00:00:00").toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


// Search and Filter

function filterJobs() {

    const search = searchInput.value.toLowerCase().trim();
    const location = locationInput.value.toLowerCase().trim();

    let filteredJobs = jobs.filter(job => {

        const searchableText = [
            job.title,
            job.company,
            ...job.skills
        ].join(" ").toLowerCase();

        const matchesSearch = searchableText.includes(search);

        const matchesLocation =
            job.location.toLowerCase().includes(location);

        const matchesType =
            typeFilter.value === "All" ||
            job.type === typeFilter.value;

        const matchesMode =
            workFilter.value === "All" ||
            job.mode === workFilter.value;

        const matchesCategory =
            (categoryFilter.value === "All" ||
            job.category === categoryFilter.value) &&
            (selectedCategory === "All" ||
            job.category === selectedCategory);

        return matchesSearch &&
               matchesLocation &&
               matchesType &&
               matchesMode &&
               matchesCategory;

    });


    // Sorting

    if (sortFilter.value === "salary") {

        filteredJobs.sort((a, b) => b.salary - a.salary);

    } else if (sortFilter.value === "deadline") {

        filteredJobs.sort((a, b) =>
            new Date(a.deadline) - new Date(b.deadline)
        );

    }

    displayJobs(filteredJobs);

}


// Search Button

document.getElementById("searchBtn").addEventListener(
    "click",
    filterJobs
);


// Enter key search

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") filterJobs();
});

locationInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") filterJobs();
});


// Filters

typeFilter.addEventListener("change", filterJobs);
workFilter.addEventListener("change", filterJobs);
categoryFilter.addEventListener("change", filterJobs);
sortFilter.addEventListener("change", filterJobs);


// Category Buttons

document.querySelectorAll(".category-btn").forEach(button => {

    button.addEventListener("click", function() {

        document.querySelectorAll(".category-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        selectedCategory = this.dataset.category;

        categoryFilter.value = "All";

        filterJobs();

    });

});


// Clear Filters

document.getElementById("clearFilters").addEventListener(
    "click",
    function() {

        searchInput.value = "";
        locationInput.value = "";

        typeFilter.value = "All";
        workFilter.value = "All";
        categoryFilter.value = "All";
        sortFilter.value = "default";

        selectedCategory = "All";

        document.querySelectorAll(".category-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        document.querySelector('[data-category="All"]')
            .classList.add("active");

        filterJobs();

    }
);


// Save Job and Apply Job using event delegation

jobList.addEventListener("click", function(event) {

    const saveButton = event.target.closest("[data-save]");
    const applyButton = event.target.closest("[data-apply]");
    const detailsButton = event.target.closest("[data-details]");


    // Save Job

    if (saveButton) {

        const jobId = Number(saveButton.dataset.save);

        if (savedJobs.includes(jobId)) {

            savedJobs = savedJobs.filter(id => id !== jobId);

        } else {

            savedJobs.push(jobId);

        }

        localStorage.setItem(
            "careerConnectSavedJobs",
            JSON.stringify(savedJobs)
        );

        filterJobs();

    }


    // Apply Job (Demo)

    if (applyButton && !applyButton.disabled) {

        const jobId = Number(applyButton.dataset.apply);

        const job = jobs.find(item => item.id === jobId);

        if (!job) return;

        const confirmation = confirm(
            `Do you want to apply for ${job.title} at ${job.company}?`
        );

        if (confirmation) {

            appliedJobs.push({
                jobId: job.id,
                jobTitle: job.title,
                company: job.company,
                appliedDate: new Date().toISOString(),
                status: "Applied"
            });

            localStorage.setItem(
                "careerConnectApplications",
                JSON.stringify(appliedJobs)
            );

            alert("Demo application recorded successfully!");

            filterJobs();

        }

    }


    // View Details

    if (detailsButton) {

        const jobId = Number(detailsButton.dataset.details);

        const job = jobs.find(item => item.id === jobId);

        if (job) {

            alert(
                "Job: " + job.title +
                "\nCompany: " + job.company +
                "\nLocation: " + job.location +
                "\nType: " + job.type +
                "\nSalary: " + job.salaryText +
                "\nSkills: " + job.skills.join(", ") +
                "\nDeadline: " + formatDate(job.deadline) +
                "\n\n" + job.description
            );

        }

    }

});


// Display Student Name

const studentName = sessionStorage.getItem("studentName");

if (studentName) {
    document.getElementById("studentName").textContent = studentName;
}


// Mobile Sidebar

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", function() {
    sidebar.classList.toggle("show");
});


// Initial Display

displayJobs(jobs);
