async function checkPassword() {
  let name = document.getElementById("User-name");
  let lastName = document.getElementById("User-lastname");
  let emailAsigned = document.getElementById("User-email");
  let passwordAsigned1 = document.getElementById("User-password");
  let passwordAsigned2 = document.getElementById("Password-confirmation");
  let checkboxInitial = document.getElementById("checkboxInitial");

  if (passwordAsigned1.value != passwordAsigned2.value) {
    validator2.textContent = "Las contraseñas no coinciden";
    return;
  }

  if (!name.value || !lastName.value || !emailAsigned.value || !passwordAsigned1.value) {
    console.log("No puede dejar espacios vacíos");
    return;
  }

  if (!checkboxInitial.checked) {
    console.log("Debe aceptar los términos y condiciones");
    return;
  }

  try {
    // Enviar datos al backend
    const response = await fetch('http://localhost:3000/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        lastName: lastName.value, 
        email: emailAsigned.value,
        password: passwordAsigned1.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error en el registro");
    }

    localStorage.setItem("name", data.name);
    localStorage.setItem("lastName", data.lastName || "");
    localStorage.setItem("email", data.email);
    
    window.location.href = "Inicio.html";
  } catch (error) {
    console.log(error.message);
  }
}

async function login() {
  let emailLogin = document.getElementById("emailInput").value.trim();
  let passwordLogin = document.getElementById("passwordInput").value.trim();

  if (!emailLogin || !passwordLogin) {
    console.log("Email y contraseña son requeridos");
    return;
  }

  try {
    console.log("enviando datos al servidor...");
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailLogin,
        password: passwordLogin
      })
    });

    const data = await response.json();
    console.log("respuesta del servidor", data)

    if (!response.ok) {
      throw new Error(data.error || "Error en el login");
    }

    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("lastName", data.user.lastName || "");

    console.log("usuario guardado", data.user);

    console.log("Login exitoso!");

    setTimeout(() => {
      window.location.href = "restaurantes.html";
    }, 1000);

  } catch (error) {
    console.log(error.message);
  }
}

let user = {
  name: localStorage.getItem("name"),
  lastName: localStorage.getItem("lastName"),
  email: localStorage.getItem("email"),
  password: localStorage.getItem("password"),
};
