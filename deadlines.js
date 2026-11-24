
// HTML Elements

const reminderForm = document.getElementById("reminderForm");
const reminderList = document.getElementById("reminderList");
const emptyMessage = document.getElementById("emptyMessage");

const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");
const filterStatus = document.getElementById("filterStatus");

const formMessage = document.getElementById("formMessage");


// Local Storage Keys

const reminderStorageKey = "careerConnectReminders";
const completedStorageKey = "careerConnectCompletedDeadlines";


// Load Custom Reminders

let customReminders = JSON.parse(
    localStorage.getItem(reminderStorageKey) || "[]"
);


// Load Completed Job Deadlines

let completedDeadlines = JSON.parse(
    localStorage.getItem(completedStorageKey) || "[]"
);


// Sample Job Deadlines
// Fallback for applications created before deadline integration.

const jobDeadlines = {
    1: "2026-12-30",
    2: "2027-01-15",
    3: "2026-12-20",
    4: "2027-01-10",
    5: "2026-12-25",
    6: "2027-01-05"
};


// Get Today's Date

function getToday() {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


// Format Date

function formatDate(dateValue) {

    const date = new Date(dateValue + "T00:00:00");

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

}


// Escape User Input Before Inserting into HTML

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function(character) {

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


// Get Job Deadline Reminders

function getJobReminders() {

    const applications = JSON.parse(
        localStorage.getItem("careerConnectApplications") || "[]"
    );

    return applications.map(app => {

        const deadline =
            app.deadline || jobDeadlines[app.jobId];

        if (!deadline) return null;

        return {
            id: "job-" + app.jobId,
            title: app.jobTitle + " - Application Deadline",
            type: "Job Application",
            date: deadline,
            notes: "Company: " + app.company,
            source: "job",
            completed: completedDeadlines.includes(
                "job-" + app.jobId
            )
        };

    }).filter(Boolean);

}


// Get All Reminders

function getAllReminders() {

    const jobReminders = getJobReminders();

    return [...jobReminders, ...customReminders];

}


// Get Reminder Status

function getReminderStatus(reminder) {

    if (reminder.completed) {
        return "Completed";
    }

    if (reminder.date < getToday()) {
        return "Overdue";
    }

    return "Upcoming";

}


// Save Custom Reminders

function saveReminders() {

    localStorage.setItem(
        reminderStorageKey,
        JSON.stringify(customReminders)
    );

}


// Update Statistics

function updateStatistics() {

    const allReminders = getAllReminders();

    const total = allReminders.length;

    const upcoming = allReminders.filter(reminder =>
        getReminderStatus(reminder) === "Upcoming"
    ).length;

    const overdue = allReminders.filter(reminder =>
        getReminderStatus(reminder) === "Overdue"
    ).length;

    const completed = allReminders.filter(reminder =>
        getReminderStatus(reminder) === "Completed"
    ).length;


    document.getElementById("totalReminders").textContent = total;

    document.getElementById("upcomingCount").textContent = upcoming;

    document.getElementById("overdueCount").textContent = overdue;

    document.getElementById("completedCount").textContent = completed;

}


// Get Category Icon

function getCategoryIcon(type) {

    const icons = {
        "Job Application": "bi-briefcase",
        "Interview": "bi-people",
        "Assignment": "bi-journal-text",
        "Personal": "bi-person"
    };

    return icons[type] || "bi-calendar-event";

}


// Display Reminders

function displayReminders() {

    const allReminders = getAllReminders();

    const searchText = searchInput.value.toLowerCase().trim();

    const selectedType = filterType.value;
    const selectedStatus = filterStatus.value;


    const filteredReminders = allReminders.filter(reminder => {

        const title = reminder.title.toLowerCase();
        const notes = (reminder.notes || "").toLowerCase();

        const matchesSearch =
            title.includes(searchText) ||
            notes.includes(searchText);

        const matchesType =
            selectedType === "All" ||
            reminder.type === selectedType;

        const status = getReminderStatus(reminder);

        const matchesStatus =
            selectedStatus === "All" ||
            status === selectedStatus;

        return matchesSearch && matchesType && matchesStatus;

    });


    reminderList.innerHTML = "";

    // Empty Message

    if (filteredReminders.length === 0) {

        reminderList.hidden = true;
        emptyMessage.hidden = false;

        return;

    }

    reminderList.hidden = false;
    emptyMessage.hidden = true;


    // Sort by Date

    filteredReminders.sort((a, b) =>
        a.date.localeCompare(b.date)
    );


    // Create Reminder Cards

    filteredReminders.forEach(reminder => {

        const status = getReminderStatus(reminder);

        const statusClass = "status-" + status.toLowerCase();

        const icon = getCategoryIcon(reminder.type);

        const isJobReminder = reminder.source === "job";

        const card = document.createElement("div");

        card.className = "reminder-card";

        card.innerHTML = `

            <div class="reminder-info">

                <div class="reminder-icon">
                    <i class="bi ${icon}"></i>
                </div>

                <div class="reminder-text">

                    <h6>${escapeHTML(reminder.title)}</h6>

                    <p>
                        ${escapeHTML(reminder.type)}
                    </p>

                    ${reminder.notes ? `
                        <p class="reminder-notes">
                            ${escapeHTML(reminder.notes)}
                        </p>
                    ` : ""}

                    <div class="reminder-meta">

                        <span>
                            <i class="bi bi-calendar-event"></i>
                            ${formatDate(reminder.date)}
                        </span>

                        <span>
                            <i class="bi bi-clock"></i>
                            ${status === "Overdue" ? "Deadline passed" : status}
                        </span>

                    </div>

                    <div class="reminder-actions">

                        ${status !== "Completed" ? `
                            <button class="complete-btn"
                                    data-complete="${escapeHTML(reminder.id)}">
                                <i class="bi bi-check-circle"></i>
                                Mark Completed
                            </button>
                        ` : ""}

                        ${!isJobReminder ? `
                            <button class="delete-btn"
                                    data-delete="${escapeHTML(reminder.id)}">
                                <i class="bi bi-trash"></i>
                                Delete
                            </button>
                        ` : ""}

                    </div>

                </div>

            </div>

            <div class="reminder-card-right">

                <span class="reminder-status ${statusClass}">
                    ${status}
                </span>

            </div>

        `;

        reminderList.appendChild(card);

    });

}


// Add New Reminder

reminderForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const title = document.getElementById("reminderTitle").value.trim();

    const date = document.getElementById("reminderDate").value;

    const type = document.getElementById("reminderType").value;

    const notes = document.getElementById("reminderNotes").value.trim();


    if (!title || !date || !type) {

        showMessage("Please fill all required fields.", "error");

        return;

    }


    if (date < getToday()) {

        showMessage("Please select today or a future date.", "error");

        return;

    }


    const newReminder = {

        id: "custom-" + Date.now(),

        title: title,

        date: date,

        type: type,

        notes: notes,

        source: "custom",

        completed: false

    };


    customReminders.push(newReminder);

    saveReminders();

    reminderForm.reset();

    showMessage("Reminder added successfully!", "success");

    updateStatistics();

    displayReminders();

});


// Show Form Message

function showMessage(message, type) {

    formMessage.textContent = message;

    formMessage.className = "form-message " + type;

}


// Complete and Delete Reminder

reminderList.addEventListener("click", function(event) {

    const completeButton = event.target.closest("[data-complete]");

    const deleteButton = event.target.closest("[data-delete]");


    // Mark Completed

    if (completeButton) {

        const reminderId = completeButton.dataset.complete;

        if (reminderId.startsWith("job-")) {

            if (!completedDeadlines.includes(reminderId)) {
                completedDeadlines.push(reminderId);
            }

            localStorage.setItem(
                completedStorageKey,
                JSON.stringify(completedDeadlines)
            );

        } else {

            const reminder = customReminders.find(
                item => item.id === reminderId
            );

            if (reminder) {
                reminder.completed = true;
            }

            saveReminders();

        }

        updateStatistics();

        displayReminders();

    }


    // Delete Custom Reminder

    if (deleteButton) {

        const reminderId = deleteButton.dataset.delete;

        const confirmation = confirm(
            "Are you sure you want to delete this reminder?"
        );

        if (confirmation) {

            customReminders = customReminders.filter(
                item => item.id !== reminderId
            );

            saveReminders();

            updateStatistics();

            displayReminders();

        }

    }

});


// Search

searchInput.addEventListener("input", displayReminders);


// Filters

filterType.addEventListener("change", displayReminders);

filterStatus.addEventListener("change", displayReminders);


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


// Initial Display

document.getElementById("reminderDate").min = getToday();

updateStatistics();

displayReminders();
