
// ======================================
// CareerConnect - Profile JavaScript
// ======================================

const profileForm = document.getElementById("profileForm");
const profileMessage = document.getElementById("profileMessage");

const profileKey = "careerConnectProfile";
const imageKey = "careerConnectProfileImage";
const projectsKey = "careerConnectProjects";
const certificatesKey = "careerConnectCertificates";

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
    "skills"
];

let projects = [];
let certificates = [];


// ======================================
// Sidebar
// ======================================

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("profileSidebar");

if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", function () {
        sidebar.classList.toggle("show");
    });
}


// ======================================
// Profile Functions
// ======================================

function getProfileData() {
    const data = {};

    fields.forEach(function (id) {
        const element = document.getElementById(id);

        if (element) {
            data[id] = element.value.trim();
        }
    });

    return data;
}


function updateProfileOverview(data = {}) {
    const displayName = document.getElementById("displayName");
    const displayEmail = document.getElementById("displayEmail");
    const avatar = document.getElementById("profileAvatar");

    if (displayName) {
        displayName.textContent = data.fullName || "Your Name";
    }

    if (displayEmail) {
        displayEmail.textContent = data.email || "your.email@example.com";
    }

    if (avatar && !localStorage.getItem(imageKey)) {
        avatar.innerHTML = data.fullName
            ? data.fullName.charAt(0).toUpperCase()
            : '<i class="bi bi-person-fill"></i>';
    }
}


function updateProgress() {
    const data = getProfileData();

    const completed = fields.filter(function (id) {
        return data[id] && data[id].length > 0;
    }).length;

    const percentage = Math.round((completed / fields.length) * 100);

    const percentElement = document.getElementById("completionPercent");
    const barElement = document.getElementById("completionBar");

    if (percentElement) {
        percentElement.textContent = percentage + "%";
    }

    if (barElement) {
        barElement.style.width = percentage + "%";
    }
}


function loadProfile() {
    try {
        const saved = JSON.parse(localStorage.getItem(profileKey) || "{}");

        fields.forEach(function (id) {
            const element = document.getElementById(id);

            if (element && saved[id] !== undefined) {
                element.value = saved[id];
            }
        });

        updateProfileOverview(saved);

    } catch (error) {
        console.error("Unable to load profile:", error);
    }

    updateProgress();

    const savedImage = localStorage.getItem(imageKey);

    if (savedImage) {
        showProfileImage(savedImage);
    }
}


// ======================================
// Save Profile
// ======================================

if (profileForm) {
    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!profileForm.checkValidity()) {
            profileForm.reportValidity();
            return;
        }

        const data = getProfileData();

        localStorage.setItem(profileKey, JSON.stringify(data));
        localStorage.setItem(projectsKey, JSON.stringify(projects));
        localStorage.setItem(certificatesKey, JSON.stringify(certificates));

        updateProfileOverview(data);
        updateProgress();

        if (profileMessage) {
            profileMessage.textContent = "Your profile has been saved successfully!";
            profileMessage.style.color = "green";
        }

        alert("Your profile has been saved successfully!");
    });

    profileForm.addEventListener("input", updateProgress);
    profileForm.addEventListener("change", updateProgress);
}


// ======================================
// Reset Profile
// ======================================

const resetButton = document.getElementById("resetProfileBtn");

if (resetButton) {
    resetButton.addEventListener("click", function () {

        const answer = confirm(
            "Are you sure you want to reset your profile, projects and certificates?"
        );

        if (!answer) {
            return;
        }

        profileForm.reset();

        localStorage.removeItem(profileKey);
        localStorage.removeItem(imageKey);
        localStorage.removeItem(projectsKey);
        localStorage.removeItem(certificatesKey);

        projects = [];
        certificates = [];

        renderProjects();
        renderCertificates();

        const imageInput = document.getElementById("profileImage");

        if (imageInput) {
            imageInput.value = "";
        }

        showProfileImage(null);
        updateProfileOverview({});
        updateProgress();

        if (profileMessage) {
            profileMessage.textContent = "";
        }

        alert("Your profile has been reset successfully!");
    });
}


// ======================================
// Profile Image
// ======================================

const profileImageInput = document.getElementById("profileImage");
const removePhotoBtn = document.getElementById("removePhoto");


function showProfileImage(imageData) {
    const avatar = document.getElementById("profileAvatar");

    if (!avatar) return;

    if (imageData) {
        const image = document.createElement("img");

        image.src = imageData;
        image.alt = "Profile Photo";
        image.style.width = "100%";
        image.style.height = "100%";
        image.style.objectFit = "cover";
        image.style.borderRadius = "50%";

        avatar.replaceChildren(image);

    } else {
        const name = document.getElementById("fullName")?.value.trim();

        avatar.textContent = name
            ? name.charAt(0).toUpperCase()
            : "";

        if (!name) {
            avatar.innerHTML = '<i class="bi bi-person-fill"></i>';
        }
    }
}


if (profileImageInput) {
    profileImageInput.addEventListener("change", function () {
        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file.");
            this.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Image size must be less than 2 MB.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            try {
                localStorage.setItem(imageKey, event.target.result);
                showProfileImage(event.target.result);
            } catch (error) {
                alert("Image could not be saved. Please try a smaller image.");
            }
        };

        reader.readAsDataURL(file);
    });
}


if (removePhotoBtn) {
    removePhotoBtn.addEventListener("click", function () {
        if (!confirm("Are you sure you want to remove your profile photo?")) {
            return;
        }

        localStorage.removeItem(imageKey);

        if (profileImageInput) {
            profileImageInput.value = "";
        }

        showProfileImage(null);

        alert("Profile photo removed successfully!");
    });
}


// ======================================
// Modal Functions
// ======================================

function openModal(id) {
    const modal = document.getElementById(id);

    if (modal) {
        modal.classList.add("active");
    }
}


function closeModal(id) {
    const modal = document.getElementById(id);

    if (modal) {
        modal.classList.remove("active");
    }
}


// ======================================
// Project Functions
// ======================================

const addProjectBtn = document.getElementById("addProjectBtn");
const projectForm = document.getElementById("projectForm");


if (addProjectBtn) {
    addProjectBtn.addEventListener("click", function () {
        projectForm.reset();
        document.getElementById("projectIndex").value = "";
        document.getElementById("projectModalTitle").textContent = "Add Project";

        openModal("projectModal");
    });
}


function renderProjects() {
    const list = document.getElementById("projectList");

    if (!list) return;

    list.innerHTML = "";

    projects.forEach(function (project, index) {
        const card = document.createElement("div");
        card.className = "item-card project-item";

        const details = document.createElement("div");
        details.className = "project-details";

        const title = document.createElement("h5");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        const tech = document.createElement("small");
        tech.textContent = project.tech;

        details.append(title, description, tech);

        if (project.fileName) {
            const fileName = document.createElement("p");
            fileName.className = "selected-file-name";
            fileName.textContent = "File: " + project.fileName;
            details.appendChild(fileName);
        }

        if (project.link) {
            const link = document.createElement("a");
            link.href = project.link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "View Project";
            details.appendChild(link);
        }

        const actions = document.createElement("div");
        actions.className = "item-actions";

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "add-btn";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
            editProject(index);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
        deleteButton.addEventListener("click", function () {
            deleteProject(index);
        });

        actions.append(editButton, deleteButton);
        card.append(details, actions);
        list.appendChild(card);
    });
}


if (projectForm) {
    projectForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!projectForm.checkValidity()) {
            projectForm.reportValidity();
            return;
        }

        const index = document.getElementById("projectIndex").value;
        const file = document.getElementById("projectModalFile").files[0];

        const oldProject = index !== "" ? projects[Number(index)] : null;

        const project = {
            title: document.getElementById("projectTitle").value.trim(),
            description: document.getElementById("projectDescription").value.trim(),
            tech: document.getElementById("projectTech").value.trim(),
            link: document.getElementById("projectLink").value.trim(),
            fileName: file ? file.name : (oldProject?.fileName || "")
        };

        if (index !== "") {
            projects[Number(index)] = project;
        } else {
            projects.push(project);
        }

        localStorage.setItem(projectsKey, JSON.stringify(projects));

        renderProjects();
        closeModal("projectModal");
        projectForm.reset();

        alert(index !== ""
            ? "Project updated successfully!"
            : "Project added successfully!");
    });
}


function editProject(index) {
    const project = projects[index];

    document.getElementById("projectIndex").value = index;
    document.getElementById("projectTitle").value = project.title;
    document.getElementById("projectDescription").value = project.description;
    document.getElementById("projectTech").value = project.tech;
    document.getElementById("projectLink").value = project.link;

    document.getElementById("projectModalTitle").textContent = "Edit Project";

    openModal("projectModal");
}


function deleteProject(index) {
    if (!confirm("Are you sure you want to delete this project?")) {
        return;
    }

    projects.splice(index, 1);

    localStorage.setItem(projectsKey, JSON.stringify(projects));

    renderProjects();

    alert("Project deleted successfully!");
}


function deleteProjectCard(button) {
    const card = button.closest(".item-card");

    if (card && confirm("Are you sure you want to delete this project?")) {
        card.remove();
        alert("Project deleted from the list.");
    }
}


// ======================================
// Certificate Functions
// ======================================

const addCertificateBtn = document.getElementById("addCertificateBtn");
const certificateForm = document.getElementById("certificateForm");


if (addCertificateBtn) {
    addCertificateBtn.addEventListener("click", function () {
        certificateForm.reset();
        document.getElementById("certificateIndex").value = "";
        document.getElementById("certificateModalTitle").textContent = "Add Certificate";

        openModal("certificateModal");
    });
}


function renderCertificates() {
    const list = document.getElementById("certificateList");

    if (!list) return;

    list.innerHTML = "";

    certificates.forEach(function (certificate, index) {
        const card = document.createElement("div");
        card.className = "item-card certificate-item";

        const details = document.createElement("div");

        const title = document.createElement("h5");
        title.textContent = certificate.name;

        const organization = document.createElement("p");
        organization.textContent = "Issued by " + certificate.organization;

        const date = document.createElement("small");
        date.textContent = certificate.date
            ? "Issue Date: " + certificate.date
            : "Issue date not provided";

        details.append(title, organization, date);

        if (certificate.fileName) {
            const fileName = document.createElement("p");
            fileName.className = "selected-file-name";
            fileName.textContent = "File: " + certificate.fileName;
            details.appendChild(fileName);
        }

        if (certificate.url) {
            const link = document.createElement("a");
            link.href = certificate.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "View Certificate";
            details.appendChild(link);
        }

        const actions = document.createElement("div");
        actions.className = "item-actions";

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "add-btn";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
            editCertificate(index);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
        deleteButton.addEventListener("click", function () {
            deleteCertificate(index);
        });

        actions.append(editButton, deleteButton);
        card.append(details, actions);
        list.appendChild(card);
    });
}


if (certificateForm) {
    certificateForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!certificateForm.checkValidity()) {
            certificateForm.reportValidity();
            return;
        }

        const index = document.getElementById("certificateIndex").value;
        const file = document.getElementById("certificateModalFile").files[0];

        const oldCertificate =
            index !== "" ? certificates[Number(index)] : null;

        const certificate = {
            name: document.getElementById("certificateName").value.trim(),
            organization: document.getElementById("certificateOrganization").value.trim(),
            date: document.getElementById("certificateDate").value,
            certificateId: document.getElementById("certificateId").value.trim(),
            url: document.getElementById("certificateUrl").value.trim(),
            fileName: file ? file.name : (oldCertificate?.fileName || "")
        };

        if (index !== "") {
            certificates[Number(index)] = certificate;
        } else {
            certificates.push(certificate);
        }

        localStorage.setItem(certificatesKey, JSON.stringify(certificates));

        renderCertificates();
        closeModal("certificateModal");
        certificateForm.reset();

        alert(index !== ""
            ? "Certificate updated successfully!"
            : "Certificate added successfully!");
    });
}


function editCertificate(index) {
    const certificate = certificates[index];

    document.getElementById("certificateIndex").value = index;
    document.getElementById("certificateName").value = certificate.name;
    document.getElementById("certificateOrganization").value = certificate.organization;
    document.getElementById("certificateDate").value = certificate.date;
    document.getElementById("certificateId").value = certificate.certificateId;
    document.getElementById("certificateUrl").value = certificate.url;

    document.getElementById("certificateModalTitle").textContent = "Edit Certificate";

    openModal("certificateModal");
}


function deleteCertificate(index) {
    if (!confirm("Are you sure you want to delete this certificate?")) {
        return;
    }

    certificates.splice(index, 1);

    localStorage.setItem(certificatesKey, JSON.stringify(certificates));

    renderCertificates();

    alert("Certificate deleted successfully!");
}


function deleteCertificateCard(button) {
    const card = button.closest(".item-card");

    if (card && confirm("Are you sure you want to delete this certificate?")) {
        card.remove();
        alert("Certificate deleted from the list.");
    }
}


// ======================================
// Load Saved Projects and Certificates
// ======================================

function loadProjectsAndCertificates() {
    try {
        projects = JSON.parse(localStorage.getItem(projectsKey) || "[]");
        certificates = JSON.parse(localStorage.getItem(certificatesKey) || "[]");
    } catch (error) {
        projects = [];
        certificates = [];
    }

    renderProjects();
    renderCertificates();
}


// ======================================
// Initialize
// ======================================

loadProfile();
loadProjectsAndCertificates();
