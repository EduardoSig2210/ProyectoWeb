let totalGlobal = 0;
let countGlobal = 0;

document.querySelectorAll('.menu-card').forEach(card => {
  let qty = card.querySelector('.qty');
  let subtotal = card.querySelector('.subtotal');
  let price = parseFloat(card.dataset.price);
  let cantidad = 0;

  function update() {
    subtotal.textContent = `Subtotal: $ ${(price * cantidad).toFixed(2)}`;
  }

  card.querySelector('.plus').addEventListener('click', () => {
    cantidad++;
    qty.textContent = cantidad;
    totalGlobal += price;
    countGlobal++;
    update();
    updateCartDisplay();
  });

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

function updateCartDisplay() {
  document.getElementById("cart-count").textContent = countGlobal;
  document.getElementById("cart-total").textContent = `Total: $ ${totalGlobal.toFixed(2)}`;

  document.getElementById("cart-items").textContent =
    countGlobal > 0 ? "Productos agregados ✔️" : "No hay productos aún";
}

document.getElementById("cart-widget").addEventListener("click", () => {
  let panel = document.getElementById("cart-panel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
});
