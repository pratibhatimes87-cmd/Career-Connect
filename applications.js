
// Get HTML Elements

const applicationList = document.getElementById("applicationList");
const emptyMessage = document.getElementById("emptyMessage");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");


// Get Applications from Local Storage

let applications = JSON.parse(
    localStorage.getItem("careerConnectApplications") || "[]"
);


// Save Applications

function saveApplications() {

    localStorage.setItem(
        "careerConnectApplications",
        JSON.stringify(applications)
    );

}


// Format Date

function formatDate(dateValue) {

    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
        return "Date not available";
    }

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

}


// Update Statistics

function updateStatistics() {

    document.getElementById("totalApplications").textContent =
        applications.length;

    document.getElementById("appliedCount").textContent =
        applications.filter(app => app.status === "Applied").length;

    document.getElementById("interviewCount").textContent =
        applications.filter(app => app.status === "Interview").length;

    document.getElementById("selectedCount").textContent =
        applications.filter(app => app.status === "Selected").length;

}


// Display Applications

function displayApplications() {

    const searchText = searchInput.value.toLowerCase().trim();

    const selectedStatus = statusFilter.value;


    // Search and Filter

    const filteredApplications = applications.filter(app => {

        const title = (app.jobTitle || "").toLowerCase();
        const company = (app.company || "").toLowerCase();

        const matchesSearch =
            title.includes(searchText) ||
            company.includes(searchText);

        const matchesStatus =
            selectedStatus === "All" ||
            app.status === selectedStatus;

        return matchesSearch && matchesStatus;

    });


    applicationList.innerHTML = "";

    document.getElementById("applicationCount").textContent =
        `Showing ${filteredApplications.length} of ${applications.length} applications`;


    // Show Empty Message

    if (filteredApplications.length === 0) {

        applicationList.hidden = true;
        emptyMessage.hidden = false;

        if (applications.length === 0) {

            emptyMessage.querySelector("h5").textContent =
                "No Applications Found";

            emptyMessage.querySelector("p").textContent =
                "You have not applied for any jobs yet.";

        } else {

            emptyMessage.querySelector("h5").textContent =
                "No Matching Applications";

            emptyMessage.querySelector("p").textContent =
                "Try changing your search or status filter.";

        }

        return;

    }


    applicationList.hidden = false;
    emptyMessage.hidden = true;


    // Create Application Cards

    filteredApplications.forEach(app => {

        const status = app.status || "Applied";

        const statusClass = "status-" + status.toLowerCase();

        const card = document.createElement("div");

        card.className = "application-card";

        card.innerHTML = `

            <div class="application-top">

                <div class="application-info">

                    <div class="company-logo">
                        <i class="bi bi-building"></i>
                    </div>

                    <div>
                        <h6>${app.jobTitle || "Job Title"}</h6>
                        <p class="company-name">
                            ${app.company || "Company"}
                        </p>
                    </div>

                </div>

                <span class="status-badge ${statusClass}">
                    ${status}
                </span>

            </div>


            <div class="application-details">

                <span>
                    <i class="bi bi-calendar-check"></i>
                    Applied: ${formatDate(app.appliedDate)}
                </span>

                <span>
                    <i class="bi bi-briefcase"></i>
                    Job Application
                </span>

            </div>


            <div class="application-actions">

                <div class="status-control">

                    <label>Update Status:</label>

                    <select class="form-select status-select"
                            data-id="${app.jobId}">

                        <option value="Applied"
                            ${status === "Applied" ? "selected" : ""}>
                            Applied
                        </option>

                        <option value="Interview"
                            ${status === "Interview" ? "selected" : ""}>
                            Interview
                        </option>

                        <option value="Selected"
                            ${status === "Selected" ? "selected" : ""}>
                            Selected
                        </option>

                        <option value="Rejected"
                            ${status === "Rejected" ? "selected" : ""}>
                            Rejected
                        </option>

                    </select>

                </div>


                <button class="delete-btn"
                        data-delete="${app.jobId}">

                    <i class="bi bi-trash"></i>
                    Remove

                </button>

            </div>

        `;

        applicationList.appendChild(card);

    });

}


// Update Application Status

applicationList.addEventListener("change", function(event) {

    if (event.target.classList.contains("status-select")) {

        const jobId = Number(event.target.dataset.id);

        const newStatus = event.target.value;

        const application = applications.find(
            app => Number(app.jobId) === jobId
        );

        if (application) {

            application.status = newStatus;

            saveApplications();

            updateStatistics();

            displayApplications();

        }

    }

});


// Delete Application

applicationList.addEventListener("click", function(event) {

    const deleteButton = event.target.closest("[data-delete]");

    if (!deleteButton) return;

    const jobId = Number(deleteButton.dataset.delete);

    const confirmation = confirm(
        "Are you sure you want to remove this application?"
    );

    if (confirmation) {

        applications = applications.filter(
            app => Number(app.jobId) !== jobId
        );

        saveApplications();

        updateStatistics();

        displayApplications();

    }

});


// Search

searchInput.addEventListener("input", displayApplications);


// Status Filter

statusFilter.addEventListener("change", displayApplications);


// Student Name

const studentName = sessionStorage.getItem("studentName");

if (studentName) {

    document.getElementById("studentName").textContent =
        studentName;

}


// Mobile Sidebar

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", function() {

    sidebar.classList.toggle("show");

});


// Initial Page Load

updateStatistics();

displayApplications();
