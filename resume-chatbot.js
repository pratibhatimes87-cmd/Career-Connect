
// ========================================
// Resume Assistant Chatbot
// ========================================

// Get HTML Elements
const openChatbot = document.getElementById("openChatbot");
const closeChatbot = document.getElementById("closeChatbot");
const resumeChatbot = document.getElementById("resumeChatbot");

const chatbotInput = document.getElementById("chatbotInput");
const chatbotSend = document.getElementById("chatbotSend");
const chatbotMessages = document.getElementById("chatbotMessages");


// ========================================
// Open Chatbot
// ========================================

if (openChatbot && resumeChatbot) {
    openChatbot.addEventListener("click", function () {
        resumeChatbot.classList.add("show");
        chatbotInput.focus();
    });
}


// ========================================
// Close Chatbot
// ========================================

if (closeChatbot && resumeChatbot) {
    closeChatbot.addEventListener("click", function () {
        resumeChatbot.classList.remove("show");
    });
}


// ========================================
// Display Messages
// ========================================

function displayChatMessage(message, sender) {

    const messageDiv = document.createElement("div");

    messageDiv.className = sender + "-message";
    messageDiv.textContent = message;

    chatbotMessages.appendChild(messageDiv);

    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}


// ========================================
// Demo AI Responses
// ========================================

function getChatbotResponse(message) {

    const question = message.toLowerCase();

    // Career Guidance
    if (
        question.includes("career") ||
        question.includes("mca") ||
        question.includes("job") ||
        question.includes("roadmap") ||
        question.includes("skills")
    ) {

        return `Career Guidance:

After MCA, you can explore several career options:

1. Full Stack Web Developer
2. Software Developer
3. Database Administrator
4. Network Administrator
5. Computer Science Teacher
6. Technical Support Engineer

Important Skills:
- HTML, CSS and JavaScript
- PHP and MySQL
- Python or Java
- SQL and Database Management
- Communication Skills

Tip: Choose a career according to your interests and build practical projects.`;
    }


    // Resume Assistance
    else if (
        question.includes("resume") ||
        question.includes("cv") ||
        question.includes("ats") ||
        question.includes("improve") ||
        question.includes("job description")
    ) {

        return `Resume Assistance:

Here are some ways to improve your resume:

1. Add a clear professional summary.
2. Highlight skills relevant to the target job.
3. Include academic and personal projects.
4. Mention internships and certifications.
5. Use keywords from the job description.
6. Keep the formatting simple and professional.

ATS Tips:
- Avoid unnecessary graphics.
- Use standard headings.
- Include relevant technical keywords.
- Check spelling and grammar.

Tip: Customize your resume for every job application.`;
    }


    // Interview Preparation
    else if (
        question.includes("interview") ||
        question.includes("technical") ||
        question.includes("question") ||
        question.includes("preparation") ||
        question.includes("prepare")
    ) {

        return `Interview Preparation:

Start preparing these important topics:

Technical Topics:
1. DBMS and SQL
2. Operating Systems
3. Computer Networks
4. OOP Concepts
5. Data Structures
6. HTML, CSS and JavaScript

Common Interview Questions:

Q1. Tell me about yourself.

Q2. What is DBMS?

Q3. What is the difference between HTML and CSS?

Q4. What is the difference between primary key and foreign key?

Q5. Explain your final-year project.

Interview Tips:
- Practice explaining concepts in simple words.
- Understand your projects properly.
- Improve your communication skills.
- Be confident and honest.`;
    }


    // Default Response
    else {

        return `Hello! I am your AI Career Assistant.

I can help you with:

1. Career Guidance
   Ask about career options after MCA.

2. Resume Assistance
   Ask how to improve your resume or make it ATS-friendly.

3. Interview Preparation
   Ask technical questions and interview tips.

Please ask me a question related to your career, resume or interview.`;
    }
}


// ========================================
// Send Message
// ========================================

function sendChatMessage() {

    const message = chatbotInput.value.trim();

    if (message === "") {
        return;
    }

    // Display User Message
    displayChatMessage(message, "user");

    // Clear Input
    chatbotInput.value = "";

    // Get Bot Response
    setTimeout(function () {

        const response = getChatbotResponse(message);

        displayChatMessage(response, "bot");

    }, 600);
}


// ========================================
// Send Button Click
// ========================================

if (chatbotSend) {
    chatbotSend.addEventListener("click", sendChatMessage);
}


// ========================================
// Enter Key Functionality
// ========================================

if (chatbotInput) {
    chatbotInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            sendChatMessage();
        }

    });
}
