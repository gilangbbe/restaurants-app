import RestaurantsSource from '../data/restaurants-source';
import triggerError from '../utils/triggerError';

const MainPage = {
  async render() {
    return `
      <hero-element></hero-element>
      <h2
        style="
          width: 100%;
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2%;
          font-family: 'Dancing Script';
          font-weight: bolder;
        "
      >
        Discover Restaurant
      </h2>
      <div id="restaurant-card-container">
        <restaurant-card isLoading></restaurant-card>
        <restaurant-card isLoading></restaurant-card>
        <restaurant-card isLoading></restaurant-card>
        <restaurant-card isLoading></restaurant-card>
      </div>
    `;
  },

  async afterRender() {
    const container = document.querySelector('#restaurant-card-container');
    try {
      const restaurants = await RestaurantsSource.allRestaurants();
      container.innerHTML = '';
      for (let restaurant of restaurants) {
        const restaurantCard = document.createElement('restaurant-card');
        restaurantCard.restaurant = restaurant;
        restaurantCard.isLoading = false;
        container.append(restaurantCard);
      }
    } catch (error) {
      triggerError(error.message);
    }
  },
};

export default MainPage;
