var local;

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

function menuView(buttonElement){
    const restaurantCard = buttonElement.closest('.restaurant-card');
    
    let idRestaurant = restaurantCard.id;                
    let category = restaurantCard.getAttribute('data-category');
    let img = restaurantCard.querySelector('img').src;  
    
    const restaurantData = {
        name: idRestaurant,
        section: category,
        logo: img
    };

    localStorage.setItem('restaurantData', JSON.stringify(restaurantData));
    
    console.log(idRestaurant + "||" + category + "||" + img);    
    
    moveHtml("prototipo.html");
}

export function transferData(){
  return local;
} 

function moveHtml(tp){
  window.location.href = tp;
  console.log("moviendose a " + tp)
}

window.Filter = Filter;
window.menuView = menuView;
window.moveHtml = moveHtml;

console.log("✅ Funciones globales disponibles");