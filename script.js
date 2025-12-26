// Fake student database
const students = [
    {
        registration_number: "STU001",
        password: "1234",
        name: "Alice Uwase",
        results: { Math: 85, English: 90, Science: 78 }
    },
    {
        registration_number: "STU002",
        password: "5678",
        name: "Bob Kamau",
        results: { Math: 75, English: 88, Science: 82 }
    }
];

// Login function
function login() {
    const reg = document.getElementById("regNo").value.trim();
    const pass = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    const student = students.find(s => s.registration_number === reg && s.password === pass);

    if (student) {
        // Store student data in sessionStorage to use in dashboard
        sessionStorage.setItem("currentStudent", JSON.stringify(student));
        window.location.href = "dashboard.html";

        
    } else {
        message.textContent = "❌ Wrong registration number or password";
        message.style.color = "red";
    }
}

// Logout function
function logout() {
    sessionStorage.removeItem("currentStudent");
    window.location.href = "index.html";
}

// Dashboard welcome message
window.onload = function () {
    const student = JSON.parse(sessionStorage.getItem("currentStudent"));
    const welcome = document.getElementById("welcome");

    if (welcome && student) {
        welcome.textContent = "Welcome, " + student.name;
    }
};
