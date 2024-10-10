import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import '../src/scripts/components/LikeButton';

describe('Liking a restaurant', () => {
  const createLikeButton = async (restaurant) => {
    document.body.innerHTML = '';
    const likeButton = document.createElement('like-button');
    likeButton.restaurant = restaurant;
    document.body.append(likeButton);
    await likeButton.updateComplete;
  };

  it('should show the like button when the restaurant has not been liked before', async () => {
    await createLikeButton({ id: 1 });

    expect(
      document.querySelector('like-button').hasAttribute('liked')
    ).toBeFalsy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await createLikeButton({ id: 1 });

    expect(
      document.querySelector('like-button').hasAttribute('liked')
    ).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await createLikeButton({ id: 1 });

    document
      .querySelector('like-button')
      .shadowRoot.querySelector('button')
      .dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await createLikeButton({ id: 1 });

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    document
      .querySelector('like-button')
      .shadowRoot.querySelector('button')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([
      { id: 1 },
    ]);

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });
});
