let userAsigned = document.getElementById("tfName");
let passwordAsigned1 = document.getElementById("tfPassword1");
let passwordAsigned2 = document.getElementById("tfPassword2");

function checkPassword() {
  if (passwordAsigned1.value == "" || passwordAsigned2.value == "") {
    alert("no puede dejar espacios vacios");
  } else if (passwordAsigned1.value != passwordAsigned2.value) {
    alert("Los datos de la contraseña son incorrectos");
  } else {
    alert("Datos correctos, redirigiendo...");
    localStorage.setItem("user", userAsigned.value);
    localStorage.setItem("password", passwordAsigned1.value);
    window.location.href = "inicioSesion.html";
  }
}

function login() {
  let savedUser = localStorage.getItem("user");
  let savedPassword = localStorage.getItem("password");

  let userLogin = document.getElementById("tfNameLG").value.trim();
  let passwordLogin = document.getElementById("tfPasswordLG").value.trim();

  if (userLogin == savedUser && passwordLogin == savedPassword) {
    alert("Datos correctos, redirigiendo...");
    window.location.href = "inicio.html";

  } else {
    alert("Los datos de la contraseña son incorrectos");
  }
}

function showHeader(){
  let savedUser = localStorage.getItem("user");
  const titulo = document.getElementById("titulo_inicial");

  if(titulo){
    titulo.textContent = "BIENVENIDO " + savedUser;
  }
}
