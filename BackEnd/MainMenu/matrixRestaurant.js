function Filter(){
    const categoryButtons = document.querySelectorAll('.category-list button');
    const restaurants = document.querySelectorAll('.restaurant-card');

    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        restaurants.forEach(rest => {
          const category = rest.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            rest.style.display = 'block';
          } else {
            rest.style.display = 'none';
          }
        });
      });
    });
}

function menuView(){
    let idRestaurant;
    window.location.href = "prototipo.html";
}