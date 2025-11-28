const restaurantData = JSON.parse(localStorage.getItem("restaurantData"));

// URLs para las APIs
const url1 = "http://localhost:3000/api/restaurant/";
let url2 = "http://localhost:3000/api/menu/";

// Elementos del DOM que se van a actualizar
var itemName1 = document.getElementById("itemName1");
var itemName2 = document.getElementById("itemName2");
var itemName3 = document.getElementById("itemName3");

var img1 = document.getElementById("img1");
var img2 = document.getElementById("img2");
var img3 = document.getElementById("img3");

var itemPrice1 = document.getElementById("itemPrice1");
var itemPrice2 = document.getElementById("itemPrice2");
var itemPrice3 = document.getElementById("itemPrice3");

// Funcion principal que obtiene y muestra los datos del menu
const putDataMenu = async () => {
    try {
    const restaurantData = JSON.parse(localStorage.getItem("restaurantData"));
    
    // Verificar si hay datos del restaurante
    if (!restaurantData) {
      console.log("No hay datos del restaurante");
      return;
    }

    console.log("Buscando restaurante:", restaurantData.name);

    // Obtener ID del restaurante por nombre
    const response1 = await fetch(`http://localhost:3000/api/restaurant/${restaurantData.name}`);
    const restaurantInfo = await response1.json();
    
    // Verificar si se encontro el restaurante
    if (restaurantInfo.length === 0) {
      console.error("Restaurante no encontrado:", restaurantData.name);
      return;
    }
    
    const restaurantId = restaurantInfo[0].idRestaurant;
    console.log("ID del restaurante:", restaurantId);

    // Obtener el menu del restaurante
    const response2 = await fetch(`http://localhost:3000/api/menu/${restaurantId}`);
    const items = await response2.json();

    console.log("Items del menu:", items);

    // Actualizar los elementos del DOM con los datos del menu
    if (items[0]) {
      itemName1.textContent = items[0].item;
      var item = itemName1.textContent;
      itemPrice1.textContent = "$ " + items[0].price;
      putImg(item, 1);
    }

    if (items[1]) {
      itemName2.textContent = items[1].item;
      var item = itemName2.textContent;
      itemPrice2.textContent = "$ " + items[1].price;
      putImg(item, 2);
    }

    if (items[2]) {
      itemName3.textContent = items[2].item;
      var item = itemName3.textContent;
      itemPrice3.textContent = "$ " + items[2].price;
      putImg(item, 3);
    }

  } catch (error) {
    console.error("Error:", error);
  }
};

// Funcion para aumentar la cantidad de un item
function increasing(index){
    var total = document.getElementById("qty" + index);
    let quantity = parseInt(total.textContent) || 0;
    quantity++;
    total.textContent = quantity;
    subtotal(index);
}

// Funcion para disminuir la cantidad de un item
function decreasing(index){
    var total = document.getElementById("qty" + index);
    let quantity = parseInt(total.textContent) || 0;
    if (quantity > 0) {
        quantity--;
        total.textContent = quantity;
    }
    subtotal(index);
}

// Funcion para calcular el subtotal de un item
function subtotal(index){
    const qtyElement = document.getElementById("qty" + index);
    const priceElement = document.getElementById("itemPrice" + index);
    const subtotalElement = document.getElementById("subtotal" + index);
    
    // Obtener valores numericos
    const quantity = parseInt(qtyElement.textContent) || 0;
    const priceText = priceElement.textContent.replace('$ ', '');
    const price = parseFloat(priceText) || 0;
    
    // Calcular y actualizar subtotal
    const subtotal = quantity * price;
    subtotalElement.textContent = `subtotal: $ ${subtotal.toFixed(2)}`;
    total();
}

// Funcion para calcular el total general de todos los items
function total() {
    var price = document.getElementById("price");
    
    let total = 0;
    
    // Sumar los subtotales de los 3 items
    for (let i = 1; i <= 3; i++) {
        const subtotalElement = document.getElementById("subtotal" + i);
        const subtotalText = subtotalElement.textContent;
        const number = parseFloat(subtotalText.replace(/[^\d.]/g, '')) || 0;
        total += number;
    }
    
    price.textContent = total.toFixed(2);
    console.log("💰 Total del pedido: $" + total.toFixed(2));
}

// Funcion para asignar la imagen correspondiente a cada item
function putImg(name, index){
  var imgElement = document.getElementById("img" + index);
    if (imgElement) {
        imgElement.src = `img/item/${name}.png`;
        imgElement.alt = name;
    }
}

// Hacer las funciones disponibles globalmente
window.increasing = increasing;
window.decreasing = decreasing;

// Ejecutar la funcion cuando la pagina termine de cargar
document.addEventListener('DOMContentLoaded', putDataMenu);