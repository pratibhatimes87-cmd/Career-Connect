
// =================================
// CAREERCONNECT JAVASCRIPT
// =================================

document.addEventListener("DOMContentLoaded", function () {

    // 1. NAVBAR SCROLL EFFECT

    const navbar = document.getElementById("mainNavbar");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    // 2. MOBILE NAVBAR CLOSE

    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const navbarMenu = document.getElementById("navbarMenu");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth < 992) {

                const collapse = bootstrap.Collapse.getInstance(navbarMenu);

                if (collapse) {
                    collapse.hide();
                }

            }

        });

    });


    // 3. JOB FILTER FUNCTIONALITY

    const filterButtons = document.querySelectorAll(".filter-btn");
    const jobItems = document.querySelectorAll(".job-item");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter = button.getAttribute("data-filter");

            jobItems.forEach(function (job) {

                const jobType = job.getAttribute("data-type");

                if (filter === "all" || jobType.includes(filter)) {
                    job.style.display = "";
                } else {
                    job.style.display = "none";
                }

            });

        });

    });


    // 4. JOB SEARCH FUNCTIONALITY

    const searchButton = document.getElementById("searchButton");
    const jobSearch = document.getElementById("jobSearch");
    const jobLocation = document.getElementById("jobLocation");

    searchButton.addEventListener("click", function () {

        const keyword = jobSearch.value.trim().toLowerCase();
        const location = jobLocation.value.trim().toLowerCase();

        let found = false;

        jobItems.forEach(function (job) {

            const text = job.textContent.toLowerCase();

            const keywordMatch = !keyword || text.includes(keyword);
            const locationMatch = !location || text.includes(location);

            if (keywordMatch && locationMatch) {

                job.style.display = "";
                found = true;

            } else {

                job.style.display = "none";

            }

        });

        document.getElementById("featuredJobs").scrollIntoView({
            behavior: "smooth"
        });

        if (!found) {
            alert("No matching sample opportunities found. Try another keyword or location.");
        }

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

    });


    // 5. BOOKMARK FUNCTIONALITY

    const saveButtons = document.querySelectorAll(".save-job");

    saveButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            button.classList.toggle("saved");

            const icon = button.querySelector("i");

            if (button.classList.contains("saved")) {

                icon.classList.remove("bi-bookmark");
                icon.classList.add("bi-bookmark-fill");

            } else {

                icon.classList.remove("bi-bookmark-fill");
                icon.classList.add("bi-bookmark");

            }

        });

    });


    // 6. SCROLL REVEAL ANIMATION

    const revealElements = document.querySelectorAll(
        ".category-card, .job-card, .feature-card, .process-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(function (element) {

            element.classList.add("reveal");
            observer.observe(element);

        });

    }

});


/* =================================
   CAREERCONNECT LOGIN JAVASCRIPT
================================= */

// Get HTML Elements

const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");

const loginMessage = document.getElementById("loginMessage");


// Show and Hide Password

if (togglePassword) {

    togglePassword.addEventListener("click", function () {

        if (password.type === "password") {

            password.type = "text";
            eyeIcon.classList.remove("bi-eye");
            eyeIcon.classList.add("bi-eye-slash");

            togglePassword.setAttribute("aria-label", "Hide password");

        } else {

            password.type = "password";
            eyeIcon.classList.remove("bi-eye-slash");
            eyeIcon.classList.add("bi-eye");

            togglePassword.setAttribute("aria-label", "Show password");

        }

    });

}


// Login Form Validation

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Bootstrap validation

        if (!loginForm.checkValidity()) {

            loginForm.classList.add("was-validated");

            loginMessage.className = "alert alert-danger";
            loginMessage.textContent = "Please enter a valid email and password.";

            return;

        }

        // Frontend Demo Login Only

        sessionStorage.setItem("careerConnectLogin", "true");

        loginMessage.className = "alert alert-success";
        loginMessage.textContent = "Login successful! Redirecting...";

        // Redirect to dashboard

        setTimeout(function () {

            window.location.href = "dashboard.html";

        }, 1000);

    });

}

/* =================================
   CAREERCONNECT REGISTER JAVASCRIPT
================================= */


const registerForm = document.getElementById("registerForm");

const registerPassword =
    document.getElementById("registerPassword");

const confirmPassword =
    document.getElementById("confirmPassword");

const registerMessage =
    document.getElementById("registerMessage");


// Show / Hide Password Function

function setupPasswordToggle(buttonId, inputId, iconId) {

    const button = document.getElementById(buttonId);
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (button && input && icon) {

        button.addEventListener("click", function () {

            if (input.type === "password") {

                input.type = "text";

                icon.classList.remove("bi-eye");
                icon.classList.add("bi-eye-slash");

                button.setAttribute("aria-label", "Hide password");

            } else {

                input.type = "password";

                icon.classList.remove("bi-eye-slash");
                icon.classList.add("bi-eye");

                button.setAttribute("aria-label", "Show password");

            }

        });

    }

}


// Apply Password Toggle

setupPasswordToggle(
    "toggleRegisterPassword",
    "registerPassword",
    "registerEyeIcon"
);

setupPasswordToggle(
    "toggleConfirmPassword",
    "confirmPassword",
    "confirmEyeIcon"
);


// REGISTER FORM VALIDATION

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        confirmPassword.setCustomValidity("");

        // Check Password Matching

        if (registerPassword.value !== confirmPassword.value) {

            confirmPassword.setCustomValidity("Passwords do not match.");

        }

        // Check All Fields

        if (!registerForm.checkValidity()) {

            registerForm.classList.add("was-validated");

            registerMessage.className = "alert alert-danger";

            registerMessage.textContent =
                "Please check your name, email and password fields.";

            return;

        }

        // Demo Registration

        registerMessage.className = "alert alert-success";

        registerMessage.textContent =
            "Registration successful! Redirecting to Login...";

        setTimeout(function() {

            window.location.href = "login.html";

        }, 1500);

    });

}

const registerEmailInput = document.getElementById("registerEmail");
const emailMessage = document.querySelector("#emailMessage small");

if (registerEmailInput && emailMessage) {
    registerEmailInput.addEventListener("input", function () {

        const email = registerEmailInput.value.trim();

        // Pehle purana error clear karo
        registerEmailInput.setCustomValidity("");

        if (email === "") {
            emailMessage.textContent = "";
            emailMessage.className = "";
        }
        else if (!registerEmailInput.checkValidity()) {
            emailMessage.textContent = "Please enter a valid email address.";
            emailMessage.className = "error";
            registerEmailInput.setCustomValidity("Please enter a valid email address.");
        }
        else {
            emailMessage.textContent = "Email format looks correct!";
            emailMessage.className = "success";
        }
    });
}
/* PASSWORD LIVE VALIDATION */

const registerPasswordInput =
    document.getElementById("registerPassword");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const passwordMessage =
    document.getElementById("passwordMessage");

const confirmMessage =
    document.getElementById("confirmMessage");


// Check Password Length

if (registerPasswordInput) {

    registerPasswordInput.addEventListener("input", function() {

        if (registerPasswordInput.value.length < 8) {

            passwordMessage.textContent =
                "Password is too short! Minimum 8 characters required.";

            passwordMessage.className = "error";

        } else {

            passwordMessage.textContent =
                "Good! Password length is valid.";

            passwordMessage.className = "success";

        }

        checkConfirmPassword();

    });

}


// Check Confirm Password

function checkConfirmPassword() {

    if (!confirmPasswordInput.value) {

        confirmMessage.textContent = "";
        return;

    }

    if (registerPasswordInput.value === confirmPasswordInput.value) {

        confirmMessage.textContent = "Passwords match!";
        confirmMessage.className = "success";

    } else {

        confirmMessage.textContent = "Passwords do not match!";
        confirmMessage.className = "error";

    }

}

if (confirmPasswordInput) {

    confirmPasswordInput.addEventListener("input", checkConfirmPassword);

}
