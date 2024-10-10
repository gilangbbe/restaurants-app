import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import triggerError from '../utils/triggerError';

const Favorite = {
  async render() {
    return `<div id="restaurant-card-container"></div>`;
  },

  async afterRender() {
    const container = document.querySelector('#restaurant-card-container');
    try {
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();

      if (restaurants.length > 0) {
        container.innerHTML = '';
        for (let restaurant of restaurants) {
          const restaurantCard = document.createElement('restaurant-card');
          restaurantCard.restaurant = restaurant;
          restaurantCard.isLoading = false;
          container.append(restaurantCard);
        }
      } else {
        container.innerHTML =
          '<h2 class="favorite__not__found" style="padding: 1em">No favorite restaurants<h2>';
      }
    } catch (error) {
      triggerError(error.message);
    }
  },
};

export default Favorite;
