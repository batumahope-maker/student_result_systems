function login() {
  const regNo = document.getElementById("regNo").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  const users = [
    { regNo: "Hope001", password: "1234" },
    { regNo: "Adjira002", password: "5678" },
    { regNo: "admin", password: "admin" }
  ];

  const user = users.find(
    u => u.regNo === regNo && u.password === password
  );

  if (user) {
    localStorage.setItem("student", regNo);
    window.location.href = "dashboard.html";
  } else {
    message.style.color = "red";
    message.textContent = "Wrong registration number or password";
  }
}

function logout() {
  localStorage.removeItem("student");
  window.location.href = "index.html";
}

window.onload = function () {
  const student = localStorage.getItem("student");
  const welcome = document.getElementById("welcome");

  if (welcome && student) {
    welcome.textContent = "Welcome, " + student;
  }
};
