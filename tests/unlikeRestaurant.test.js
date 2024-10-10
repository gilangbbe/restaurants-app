import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import '../src/scripts/components/LikeButton';

describe('Unliking a restaurant', () => {
  const createLikeButton = async (restaurant) => {
    document.body.innerHTML = '';
    const likeButton = document.createElement('like-button');
    likeButton.restaurant = restaurant;
    document.body.append(likeButton);
    await likeButton.updateComplete;
  };

  beforeEach(async () => {
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await createLikeButton({ id: 1 });

    await FavoriteRestaurantIdb.getAllRestaurants();

    expect(document.querySelector('like-button').liked).toBe(true);
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    createLikeButton({ id: 1 });

    await FavoriteRestaurantIdb.getAllRestaurants();

    expect(document.querySelector('like-button').liked).toBe(true);
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await createLikeButton({ id: 1 });
    await FavoriteRestaurantIdb.getAllRestaurants();
    document
      .querySelector('like-button')
      .shadowRoot.querySelector('button')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error when user click unlike widget if the unliked movie is not in the list', async () => {
    await createLikeButton({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);

    document
      .querySelector('like-button')
      .shadowRoot.querySelector('button')
      .dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
