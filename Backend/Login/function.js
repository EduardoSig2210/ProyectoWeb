async function checkPassword() {
  //Guardar datos de usuario
  let name = document.getElementById("User-name");
  let lastName = document.getElementById("User-lastname");
  let emailAsigned = document.getElementById("User-email");
  let passwordAsigned1 = document.getElementById("User-password");
  let passwordAsigned2 = document.getElementById("Password-confirmation");
  let checkboxInitial = document.getElementById("checkboxInitial");

  //Validador de contraseña
  if (passwordAsigned1.value != passwordAsigned2.value) {
    console.log("Las contraseñas no coinciden");
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Las contraseñas no coinciden',
      background: '#832525ff',
      color: '#ffffffff',
      confirmButtonColor: 'rgba(255, 0, 0, 1)',
      confirmButtonText: 'Entendido'
    });
    return;
  }

  //Validador de campos vacíos
  if (!name.value || !lastName.value || !emailAsigned.value || !passwordAsigned1.value) {
    console.log("No puede dejar espacios vacíos");
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacíos',
      text: 'No puede dejar espacios vacíos',
      background: '#832525ff',
      color: '#ffffffff',
      confirmButtonColor: 'rgba(255, 0, 0, 1)',
      confirmButtonText: 'Entendido'
    });
    return;
  }

  //Validador de términos y condiciones
  if (!checkboxInitial.checked) {
    console.log("Debe aceptar los términos y condiciones");
    Swal.fire({
      icon: 'info',
      title: 'Términos y condiciones',
      text: 'Debe aceptar los términos y condiciones',
      background: '#832525ff',
      color: '#ffffffff',
      confirmButtonColor: 'rgba(255, 0, 0, 1)',
      confirmButtonText: 'Entendido'
    });
    return;
  }

  //Enviar datos al servidor
  try {
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
    //Si hay error que lo indique
    if (!response.ok) {
      throw new Error(data.error || "Error en el registro");
    }

    //Guardar datos en localStorage
    localStorage.setItem("name", data.name);
    localStorage.setItem("lastName", data.lastName || "");
    localStorage.setItem("email", data.email);

    //Mensaje de confirmación y redirección a Inicio.html
    console.log("Registro exitoso!");
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Usuario creado exitosamente',
      background: '#832525ff',
      color: '#ffffffff',
      confirmButtonColor: 'rgba(255, 0, 0, 1)',
      confirmButtonText: 'Continuar',
      timer: 3000,
      timerProgressBar: true
    }).then(() => {
      window.location.href = "Inicio.html";
    });

    //Si algo falla en el try muestra el error
  } catch (error) {
    console.log(error.message);
    Swal.fire({
      icon: 'error',
      title: 'Error en el registro',
      text: error.message,
      background: '#832525ff',
      color: '#ffffffff',
      confirmButtonColor: 'rgba(255, 0, 0, 1)',
      confirmButtonText: 'Entendido'
    });
  }
}

async function login() {

  //Obtiene email y contraseña
  let emailLogin = document.getElementById("emailInput").value.trim();
  let passwordLogin = document.getElementById("passwordInput").value.trim();

  //Validador de campos vacíos
  if (!emailLogin || !passwordLogin) {
    console.log("Email y contraseña son requeridos");
    Swal.fire({
      icon: 'warning',
      title: 'Campos requeridos',
      text: 'Email y contraseña son requeridos',
      background: '#832525ff',
      color: '#ffffffff',
      confirmButtonColor: 'rgba(255, 0, 0, 1)',
      confirmButtonText: 'Entendido'
    });
    return;
  }

  //Enviar datos al servidor
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
    //Capta si ocurre algún error
    if (!response.ok) {
      throw new Error(data.error || "Error en el login");
    }

    //Guardar datos en localStorage
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("lastName", data.user.lastName || "");

    //Mensaje de confirmación y redirección a inicio.html
    console.log("usuario guardado", data.user);
    Swal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      text: 'Login exitoso',
      background: '#832525ff',
      color: '#ffffffff',
      confirmButtonColor: 'rgba(255, 0, 0, 1)',
      confirmButtonText: 'Continuar',
      timer: 3000,
      timerProgressBar: true
    }).then(() => {
      window.location.href = "inicio.html";
    });
    console.log("Login exitoso!");

    //Si algo falla en el try muestra el error
  } catch (error) {
    console.log(error.message);
    Swal.fire({
      icon: 'error',
      title: 'Error en el login',
      text: error.message,
      background: '#832525ff',
      color: '#ffffffff',
      confirmButtonColor: 'rgba(122, 43, 54, 0.8)',
      confirmButtonText: 'Reintentar'
    });
  }
}

//Obtienes los datos del usuario almacenados en localStorage
let user = {
  name: localStorage.getItem("name"),
  lastName: localStorage.getItem("lastName"),
  email: localStorage.getItem("email"),
  password: localStorage.getItem("password"),
};
