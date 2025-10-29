function bienvenida(){
    let titulo = document.getElementById("welcomeText");
    let name = localStorage.getItem("name");

    titulo.textContent = "bienvenido " + name;
}