Feature('Unliking restaurant');

Before(({ I }) => {
  I.amOnPage('/');

  I.seeElement('restaurant-card');
  I.click(locate('restaurant-card').first());

  I.seeElement('detail-component');

  within('detail-component', () => {
    I.seeElementInDOM('like-button');
    I.click('#likeButton');
  });
});

Scenario('Showing liked restaurants', ({ I }) => {
  I.amOnPage('/#/favorite');
  I.seeElement('restaurant-card');
});

Scenario('Unliking one restaurant', ({ I }) => {
  I.amOnPage('/#/favorite');

  I.seeElement('restaurant-card');
  I.click(locate('restaurant-card').first());

  I.seeElement('detail-component');

  within('detail-component', () => {
    I.seeElementInDOM('like-button');
    I.click('#likeButton');
  });

  I.amOnPage('/#/favorite');
  I.see('No favorite restaurants', '.favorite__not__found');
});
