const { within } = require('codeceptjs');
const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Showing empty liked movies', ({ I }) => {
  I.seeElement('.favorite__not__found');
  I.see('No favorite restaurants', '.favorite__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('No favorite restaurants', '.favorite__not__found');

  I.amOnPage('/');

  I.seeElement('restaurant-card');

  const firstRestaurantTitle = await I.grabTextFrom('.card-title');

  I.click(locate('restaurant-card').first());

  I.seeElement('detail-component');

  within('detail-component', () => {
    I.seeElementInDOM('like-button');
    I.click('#likeButton');
  });

  I.amOnPage('/#/favorite');
  I.seeElement('restaurant-card');

  const likedRestaurantTitle = await I.grabTextFrom('.card-title');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
