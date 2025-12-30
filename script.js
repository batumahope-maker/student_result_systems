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

// Forgot Password function
function recoverPassword() {
    const reg = prompt("Enter your registration number:");
    const student = students.find(s => s.registration_number === reg);

    if (student) {
        alert("Your password is: " + student.password);
    } else {
        alert("❌ Registration number not found. Please contact school administration.");
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

// Hamburger menu toggle (ONLY ONCE)
function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    menu.style.right = (menu.style.right === "0px") ? "-300px" : "0px";
}

// Show menu content
function showInfo(section) {
    const content = document.getElementById("contentArea");

    switch (section) {
        case "Announcements":
            content.innerHTML = "<h4>School Announcements</h4><p>School opens Monday at 8:00 AM.</p>";
            break;

        case "BestPerformers":
            content.innerHTML = "<h4>Best Performers</h4><p>Alice Uwase (S6)<br>Bob Kamau (S5)</p>";
            break;

        case "Schedules":
            content.innerHTML = "<h4>School Schedule</h4><p>Monday – Friday: 8:00 AM – 3:00 PM</p>";
            break;

        case "Events":
            content.innerHTML = "<h4>School Events</h4><p>Sports Day – Friday<br>Science Fair – 15 March</p>";
            break;

        case "Teachers":
            content.innerHTML = "<h4>Teachers</h4><p>Mr. Jean – Mathematics<br>Mrs. Grace – English<br>Mr. David – Science</p>";
            break;

        case "Headmaster":
            content.innerHTML = "<h4>Headmaster</h4><p>Father Polycarpe NZAYISENGA<br>Phone: +250 788 635 040<br>Email: essjt2007@yahoo.fr</p>";
            break;

        case "Trades":
            content.innerHTML = "<h4>Trades / Departments</h4><p>SWD, Tourism, Electronics, Automobile, Mechanic, FBO</p>";
            break;

       case "AttendanceStudents":
    content.innerHTML = `
        <h4>Student Attendance</h4>
        <table border="1" width="100%" cellpadding="8">
            <tr>
                <th>Registration No</th>
                <th>Name</th>
                <th>Status</th>
            </tr>
            <tr>
                <td>STU001</td>
                <td>Alice Uwase</td>
                <td>Present</td>
            </tr>
            <tr>
                <td>STU002</td>
                <td>Bob Kamau</td>
                <td>Absent</td>
            </tr>
        </table>
    `;
    break;

case "AttendanceTeachers":
    content.innerHTML = `
        <h4>Teacher Attendance</h4>
        <table border="1" width="100%" cellpadding="8">
            <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Status</th>
            </tr>
            <tr>
                <td>Mr. Jean</td>
                <td>Mathematics</td>
                <td>Present</td>
            </tr>
            <tr>
                <td>Mrs. Grace</td>
                <td>English</td>
                <td>Present</td>
            </tr>
        </table>
    `;
    break;


        case "Rules":
            content.innerHTML = "<h4>School Rules</h4><p>Be punctual<br>Respect everyone<br>No cheating<br>Wear uniform</p>";
            break;

        default:
            content.innerHTML = "<p>Select an item from the menu.</p>";
    }

    toggleMenu();
}

