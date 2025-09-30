function checkPassword() {
  let name = document.getElementById("User-name");
  let lastName = document.getElementById("User-lastname");
  let emailAsigned = document.getElementById("User-email");
  let passwordAsigned1 = document.getElementById("User-password");
  let passwordAsigned2 = document.getElementById("Password-confirmation");
  let validator2 = document.getElementById("validator2");
  let checkboxInitial = document.getElementById("checkboxInitial");
  if ((passwordAsigned1.value != passwordAsigned2.value) ||
      (passwordAsigned1.value == "" && passwordAsigned2.value == "")) {
    validator2.textContent = "Los datos de la contraseña son diferentes o estan vacios"
  } else if (passwordAsigned1.value == "" && passwordAsigned2.value == "" &&
    name.value == "" && lastName.value == "" && emailAsigned.value == "") {
    validator2.textContent = "No puede dejar espacios vacios";
  }  else if (!checkboxInitial.checked){ validator2.textContent = "Debe aceptar los terminos y condiciones"} 
    else {    
    localStorage.setItem("email", emailAsigned.value);
    localStorage.setItem("password", passwordAsigned1.value);
    window.location.href = "Inicio.html";
  }
}

function login() {
  let savedEmail = localStorage.getItem("email");
  let savedPassword = localStorage.getItem("password");
  let validator = document.getElementById("Validator");

  let emailLogin = document.getElementById("emailInput").value.trim();
  let passwordLogin = document.getElementById("passwordInput").value.trim();

  if (emailLogin == savedEmail && passwordLogin == savedPassword) {
    window.location.href = "prototipo.html";
  } else {
    validator.textContent="Datos invalidos";
  }
}

function showHeader() {
  let savedUser = localStorage.getItem("user");
  const titulo = document.getElementById("titulo_inicial");

  if (titulo) {
    titulo.textContent = "BIENVENIDO " + savedUser;
  }
}
