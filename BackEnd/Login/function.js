function checkPassword() {
  let emailAsigned = document.getElementById("User-email");
  let passwordAsigned1 = document.getElementById("User-password");
  let passwordAsigned2 = document.getElementById("Password-confirmation");
  if (passwordAsigned1.value == "" || passwordAsigned2.value == "") {
    alert("no puede dejar espacios vacios");
  } else if (passwordAsigned1.value != passwordAsigned2.value) {
    alert("Los datos de la contraseña son incorrectos");
  } else {
    alert("Datos correctos, redirigiendo...");
    localStorage.setItem("email", emailAsigned.value);
    localStorage.setItem("password", passwordAsigned1.value);
    window.location.href = "Inicio.html";
  }
}

function login() {
  let savedEmail = localStorage.getItem("email");
  let savedPassword = localStorage.getItem("password");

  let emailLogin = document.getElementById("emailInput").value.trim();
  let passwordLogin = document.getElementById("passwordInput").value.trim();

  if (emailLogin == savedEmail && passwordLogin == savedPassword) {
    alert("Datos correctos, redirigiendo...");
    window.location.href = "prototipo.html";
  } else {
    alert("Los datos de la contraseña son incorrectos");
  }
}

function showHeader() {
  let savedUser = localStorage.getItem("user");
  const titulo = document.getElementById("titulo_inicial");

  if (titulo) {
    titulo.textContent = "BIENVENIDO " + savedUser;
  }
}
