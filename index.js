const cars = [];
const brandImages = {
  AUDI: "https://images.unsplash.com/photo-1536150794560-43f988aec18e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
  BMW: "https://images.unsplash.com/photo-1528659960408-6afcdde40a3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1490&q=80",
  MERCEDES: "https://images.unsplash.com/photo-1525373205018-e72a8f16bfaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
  FORD: "https://images.unsplash.com/photo-1551206820-1a2050e76dd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80",
  SEAT: "https://ocdn.eu/pulscms-transforms/1/zgfk9kqTURBXy83OTE0ZmM2ZTI4YTA3NjRhMDgxMmEzYjFlMjJlYjZjZS5qcGVnk5UDzQQwzQSPzQsvzQZKkwXNAxTNAbyVB9kyL3B1bHNjbXMvTURBXy8yMzM3YzlmZDZiOTMxZWU2Y2IwZDIzZGNiYTI1OGE5ZC5wbmcAwgCBoTAB",
  SKODA: "https://images.unsplash.com/photo-1558678541-4894383b119a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1013&q=80",
  FIAT: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/2017_Fiat_500X_POP_Star_Multiair_1.4_Front.jpg/1200px-2017_Fiat_500X_POP_Star_Multiair_1.4_Front.jpg",
  OPEL: "https://www.auto-motor-i-sport.pl/media/lib/2400/opel-corsa-gsi-2018-1.jpg",
JAGUAR: "https://cdn-jaguarlandrover.com/api/v1/image/7103/w/640",
  MAZDA: "https://images.unsplash.com/photo-1521410195597-69e2218fcee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
  CHEVROLET: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  NISSAN: "https://images.unsplash.com/photo-1554328556-f92bd1e30d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
};
// POBIERANIE ================================================================
const app = new Vue({
  el: "#car-list-container",
  data: {
    cars: cars
  },
  methods: {
    addRandomCar: function addRandomCar() {
      cars.push({ id: Math.floor(Math.random()), name: "dupa" });
      console.log(cars);
    }
  }
});

fetch("http://car-factory.serveo.net/car", {
    method: "GET"
  })
.then(response => {
  if (response.status == 200) {
    return response.json().then(carsEntries => {
      for (let carItem of carsEntries) {
        carItem.image = brandImages[carItem.brand];
      }
      cars.push(... carsEntries)
    });
  }
})
.then(() => {
  for (let deleteButton of document.querySelectorAll("a.delete")) {
    deleteButton.addEventListener("click", function deleteCarFromApi(event) {
      event.preventDefault();
      fetch("http://car-factory.serveo.net/car/" + event.target.dataset.id, {
        method: "DELETE"
      })
      .then(response => {
        if (response.status === 200) {
          window.location.reload();
          // return response.json().then(car => cars.splice())
        }
      })
    }, true);
  }
});
// USUWANIE ========================================================================