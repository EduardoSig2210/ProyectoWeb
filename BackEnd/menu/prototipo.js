// Variables globales para llevar el control total y la cantidad de productos
let totalGlobal = 0;
let countGlobal = 0;

// Selecciona todas las tarjetas de producto y las procesa individualmente
document.querySelectorAll('.menu-card').forEach(card => {
  // Elementos de la tarjeta: cantidad, subtotal y precio base
  let qty = card.querySelector('.qty');
  let subtotal = card.querySelector('.subtotal');
  let price = parseFloat(card.dataset.price);
  let cantidad = 0;

  // Actualiza el subtotal de la tarjeta actual
  function update() {
    subtotal.textContent = `Subtotal: $ ${(price * cantidad).toFixed(2)}`;
  }

  // Evento para aumentar la cantidad
  card.querySelector('.plus').addEventListener('click', () => {
    cantidad++;
    qty.textContent = cantidad;
    totalGlobal += price;
    countGlobal++;
    update();
    updateCartDisplay();
  });

  // Evento para disminuir la cantidad (si hay productos)
  card.querySelector('.minus').addEventListener('click', () => {
    if (cantidad > 0) {
      cantidad--;
      qty.textContent = cantidad;
      totalGlobal -= price;
      countGlobal--;
      update();
      updateCartDisplay();
    }
  });
});

// Actualiza la visualizacion del carrito en la interfaz
function updateCartDisplay() {
  document.getElementById("cart-count").textContent = countGlobal;
  document.getElementById("cart-total").textContent = `Total: $ ${totalGlobal.toFixed(2)}`;

  // Mensaje dinamico segun si hay productos o no
  document.getElementById("cart-items").textContent =
    countGlobal > 0 ? "Productos agregados ✔️" : "No hay productos aun";
}

// Alterna la visibilidad del panel del carrito al hacer clic
document.getElementById("cart-widget").addEventListener("click", () => {
  let panel = document.getElementById("cart-panel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
});