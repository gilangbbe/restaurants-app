import CONFIG from './config';

const API_ENDPOINT = {
  ALLRESTAURANTS: `${CONFIG.BASE_URL}/list`,
  DETAILRESTAURANT: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  ADDREVIEW: `${CONFIG.BASE_URL}/review`,
};

export default API_ENDPOINT;
