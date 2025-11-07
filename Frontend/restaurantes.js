const restaurantes = [
    { nombre: "La Pampa", imagen: "img/pampa.jpg" },
    { nombre: "Pizza House", imagen: "img/pizza.jpg" },
    { nombre: "Sushi Go", imagen: "img/sushi.jpg" }
];

const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("searchInput");
const notFoundMessage = document.getElementById("notFoundMessage");

function mostrarRestaurantes(lista) {
    cardsContainer.innerHTML = "";
    
    lista.forEach(r => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${r.imagen}">
            <h3>${r.nombre}</h3>
        `;
        cardsContainer.appendChild(card);
    });
}

searchInput.addEventListener("input", () => {
    const texto = searchInput.value.toLowerCase();
    const filtrados = restaurantes.filter(r => r.nombre.toLowerCase().includes(texto));

    mostrarRestaurantes(filtrados);
    notFoundMessage.style.display = filtrados.length === 0 ? "block" : "none";
});

mostrarRestaurantes(restaurantes);
