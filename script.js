function login() {
    const reg = document.getElementById("regNumber").value;
    const pass = document.getElementById("password").value;

    // Fake student credentials
    const student = {
        registration_number: "STU001",
        password: "1234"
    };

    const message = document.getElementById("message");

    if (reg === student.registration_number && pass === student.password) {
        // Redirect to dashboard
        window.location.href = "dashboard.html";
    } else {
        message.textContent = "❌ Wrong registration number or password";
        message.style.color = "red";
    }
}
// Fake student database
const students = [
    {
        registration_number: "STU001",
        password: "1234",
        name: "Alice Uwase",
        results: { Math: 75, English: 88, Website: 82,  JavaScript: 80, CVC: 95, Graphic: 89, },
    {
        registration_number: "STU002",
        password: "5678",
        name: "Bob Kamau",
        results: { Math: 75, English: 88, Website: 82,  JavaScript: 80, CVC: 95, Graphic: 89, }

    }
];

// Login function
function login() {
    const reg = document.getElementById("regNumber").value;
    const pass = document.getElementById("password").value;

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
