
// ========================================
// CareerConnect Dashboard JavaScript
// ========================================

// 1. Mobile Sidebar Toggle
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", function () {
        sidebar.classList.toggle("show");
    });
}

// Close sidebar when clicking outside
document.addEventListener("click", function (event) {
    if (
        sidebar &&
        menuToggle &&
        window.innerWidth <= 991 &&
        !sidebar.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        sidebar.classList.remove("show");
    }
});

// 2. Get Student Name
const studentName = sessionStorage.getItem("studentName");

if (studentName) {
    const welcomeName = document.getElementById("welcomeName");
    const topUserName = document.getElementById("topUserName");
    const userInitial = document.getElementById("userInitial");

    if (welcomeName) {
        welcomeName.textContent = studentName;
    }

    if (topUserName) {
        topUserName.textContent = studentName;
    }

    if (userInitial) {
        userInitial.textContent =
            studentName.trim().charAt(0).toUpperCase();
    }
}

// 3. Logout Functionality
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        sessionStorage.removeItem("careerConnectLogin");
        sessionStorage.removeItem("studentName");
    });
}

// ========================================
// 4. DYNAMIC PROFILE COMPLETION
// ========================================

function updateProfileCompletion() {

    let profile = {};

    // Get profile data from localStorage
    try {
        profile = JSON.parse(
            localStorage.getItem("careerConnectProfile") || "{}"
        );
    } catch (error) {
        console.error("Profile data error:", error);
        profile = {};
    }

    // Fields required for profile completion
    const fields = [
        "fullName",
        "email",
        "phone",
        "location",
        "about",
        "qualification",
        "college",
        "studyYear",
        "percentage",
        "skills",
        "projectTitle",
        "projectTechnology",
        "projectDescription",
        "certificateName",
        "certificateProvider"
    ];

    // Count completed fields
    const completedFields = fields.filter(function (field) {

        const value = profile[field];

        if (Array.isArray(value)) {
            return value.length > 0;
        }

        return (
            value !== undefined &&
            value !== null &&
            String(value).trim() !== ""
        );

    }).length;

    // Calculate percentage
    const percentage = Math.round(
        (completedFields / fields.length) * 100
    );

    // Update percentage text
    const completionText =
        document.getElementById("profileCompletionText");

    if (completionText) {
        completionText.textContent = percentage + "%";
    }

    // Update progress bar
    const progressBar =
        document.getElementById("profileCompletionBar");

    if (progressBar) {
        progressBar.style.width = percentage + "%";
        progressBar.setAttribute("aria-valuenow", percentage);
    }

    // Update progress message
    const note =
        document.getElementById("profileCompletionNote");

    if (note) {

        if (percentage === 100) {
            note.textContent = "Great! Your profile is complete.";
        }

        else if (percentage === 0) {
            note.textContent = "Start completing your profile.";
        }

        else {
            note.textContent =
                completedFields + " of " +
                fields.length +
                " profile fields completed.";
        }
    }
}

// 5. Run Function When Page Loads
document.addEventListener(
    "DOMContentLoaded",
    updateProfileCompletion
);
