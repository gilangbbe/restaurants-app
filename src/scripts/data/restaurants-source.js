import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class RestaurantsSource {
  static async allRestaurants() {
    const response = await fetch(API_ENDPOINT.ALLRESTAURANTS);
    const responseJson = await response.json();
    return responseJson.restaurants.map((restaurant) => {
      return {
        ...restaurant,
        pictureId: `${CONFIG.BASE_IMAGE_URL_SMALL}/${restaurant.pictureId}`,
      };
    });
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAILRESTAURANT(id));
    const responseJson = await response.json();
    return {
      ...responseJson.restaurant,
      pictureId: `${CONFIG.BASE_IMAGE_URL_LARGE}/${responseJson.restaurant.pictureId}`,
    };
  }

  static async addReview(options) {
    const response = await fetch(API_ENDPOINT.ADDREVIEW, options);
    const responseJson = await response.json();
    return responseJson;
  }
}

export default RestaurantsSource;
