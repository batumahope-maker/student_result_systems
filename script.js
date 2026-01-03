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

// Login
function login() {
    const reg = document.getElementById("regNo").value.trim();
    const pass = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    const student = students.find(
        s => s.registration_number === reg && s.password === pass
    );

    if (student) {
        sessionStorage.setItem("currentStudent", JSON.stringify(student));
        window.location.href = "dashboard.html";
    } else {
        message.textContent = "❌ Wrong registration number or password";
        message.style.color = "red";
    }
}

// Forgot password
function recoverPassword() {
    const reg = prompt("Enter your registration number:");
    const student = students.find(s => s.registration_number === reg);

    if (student) {
        alert("Your password is: " + student.password);
    } else {
        alert("Registration number not found. Contact administration.");
    }
}

// Logout
function logout() {
    sessionStorage.removeItem("currentStudent");
    window.location.href = "index.html";
}

// Welcome message
window.onload = function () {
    const student = JSON.parse(sessionStorage.getItem("currentStudent"));
    const welcome = document.getElementById("welcome");

    if (welcome && student) {
        welcome.textContent = "Welcome, " + student.name;
    }
};

// Menu toggle
function toggleMenu() {
    document.getElementById("sideMenu").classList.toggle("active");
}
