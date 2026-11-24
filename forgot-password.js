
const forgotForm = document.getElementById("forgotPasswordForm");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");

forgotForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = emailInput.value.trim();

    if (email === "") {
        message.style.color = "red";
        message.textContent = "Please enter your email address.";
        return;
    }

    message.style.color = "#2563EB";

    message.textContent =
        "Your request has been submitted. Password reset email functionality will be available after backend integration.";

});
