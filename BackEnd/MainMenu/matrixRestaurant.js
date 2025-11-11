var local;

function Filter() {
  const categoryButtons = document.querySelectorAll(".category-list button");
  const restaurants = document.querySelectorAll(".restaurant-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      restaurants.forEach((rest) => {
        const category = rest.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          rest.style.display = "block";
        } else {
          rest.style.display = "none";
        }
      });
    });
  });
}

function menuView(buttonElement) {
  const restaurantCard = buttonElement.closest(".restaurant-card");

  let idRestaurant = restaurantCard.id;
  let category = restaurantCard.getAttribute("data-category");
  let img = restaurantCard.querySelector("img").src;

  const restaurantData = {
    name: idRestaurant,
    section: category,
    logo: img,
  };

  localStorage.setItem("restaurantData", JSON.stringify(restaurantData));

  console.log(idRestaurant + "||" + category + "||" + img);

  moveHtml("prototipo.html");
}

export function transferData() {
  return local;
}

function moveHtml(tp) {
  window.location.href = tp;
  console.log("moviendose a " + tp);
}

// Funcion para la busqueda de restaurantes
function setupSearch() {
    const inputBusqueda = document.getElementById("buscarRestaurante");
    const tarjetas = document.querySelectorAll(".restaurant-card");
    const mensaje = document.getElementById("mensaje-no-encontrado");

    if (!inputBusqueda) return; // Si no existe el elemento, salir

    inputBusqueda.addEventListener("input", () => {
        const texto = inputBusqueda.value.toLowerCase();
        let coincidencias = 0;

        tarjetas.forEach((card) => {
            const nombre = card.querySelector("h3").textContent.toLowerCase();
            const descripcion = card.querySelector("p").textContent.toLowerCase();
            const categoria = card.getAttribute("data-category").toLowerCase();

            if (
                nombre.includes(texto) ||
                descripcion.includes(texto) ||
                categoria.includes(texto)
            ) {
                card.style.display = "block";
                coincidencias++;
            } else {
                card.style.display = "none";
            }
        });

        if (mensaje) {
            mensaje.style.display = coincidencias === 0 ? "block" : "none";
        }
    });
}

// Funcion para los menus desplegables
function setupDropdowns() {
    const menuItems = document.querySelectorAll(".action-item");

    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            const menu = item.querySelector(".dropdown-menu");
            if (menu) {
                menu.style.display =
                    menu.style.display === "block" ? "none" : "block";
            }
        });
    });

    // Cerrar al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".action-item")) {
            document.querySelectorAll(".dropdown-menu").forEach((menu) => {
                menu.style.display = "none";
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupSearch();
    setupDropdowns();
});


window.setupSearch = setupSearch;
window.setupDropdowns = setupDropdowns;
window.Filter = Filter;
window.menuView = menuView;
window.moveHtml = moveHtml;

console.log("✅ Funciones globales disponibles");