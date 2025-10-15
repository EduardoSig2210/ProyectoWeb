import {name} from "./Login/function.js"; //Para llamar otros datos del modulo, hay que hacerlo de la forma {x,y,z,...}

function bienvenida(){
    let titulo = document.getElementById("welcomeText");

    titulo.textContent = "bienvenido " + name;
}