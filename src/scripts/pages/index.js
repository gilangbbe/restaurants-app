const mainPage = {
  init() {
    this._getInitialData();
  },

  async _getInitialData() {
    const container = document.querySelector('#restaurant-card-container');
    const data = await fetch('./data/DATA.json');
    const dataJson = await data.json();
    container.innerHTML = '';
    for (let restaurant of dataJson.restaurants) {
      const restaurantCard = document.createElement('restaurant-card');
      restaurantCard.name = restaurant.name;
      restaurantCard.id = restaurant.id;
      restaurantCard.description = restaurant.description;
      restaurantCard.pictureId = restaurant.pictureId;
      restaurantCard.city = restaurant.city;
      restaurantCard.rating = restaurant.rating;
      restaurantCard.isLoading = false;
      container.append(restaurantCard);
    }
  },
};

export default mainPage;
