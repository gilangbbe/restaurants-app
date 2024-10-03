import UrlParser from '../routes/url-parser';
import RestaurantsSource from '../data/restaurants-source';
import triggerError from '../utils/triggerError';

const Detail = {
  render() {
    return `
      <div id="detail-container">
        <!-- Loading indicator will be added dynamically here -->
      </div>
    `;
  },

  async afterRender() {
    const detailContainer = document.querySelector('#detail-container');
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loading-indicator';
    loadingIndicator.innerHTML = `
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    `;
    detailContainer.append(loadingIndicator);

    try {
      const restaurant = await RestaurantsSource.detailRestaurant(url.id);
      loadingIndicator.remove();

      const detailComponent = document.createElement('detail-component');
      detailComponent.restaurant = restaurant;
      detailContainer.append(detailComponent);
    } catch (error) {
      loadingIndicator.remove();

      triggerError(error.message);

      const errorMessage = document.createElement('p');
      errorMessage.textContent =
        'Failed to load restaurant details. Please try again later.';
      errorMessage.style.color = 'red';
      detailContainer.append(errorMessage);
    }
  },
};

export default Detail;
