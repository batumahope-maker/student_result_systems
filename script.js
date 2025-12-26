function login() {
  const regNo = document.getElementById("regNo").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (regNo === "" || password === "") {
    message.style.color = "red";
    message.textContent = "Please fill in all fields";
    return;
  }

  // DEMO USERS (Frontend only)
  const users = [
    { regNo: "STU001", password: "1234" },
    { regNo: "STU002", password: "5678" },
    { regNo: "admin", password: "admin" }
  ];

  const validUser = users.find(
    user => user.regNo === regNo && user.password === password
  );

  if (validUser) {
    message.style.color = "green";
    message.textContent = "Login successful!";

    // Optional redirect
    // window.location.href = "dashboard.html";
  } else {
    message.style.color = "red";
    message.textContent = "Wrong registration number or password";
  }
}
