Feature('Review restaurant');
const assert = require('assert');

Before(({ I }) => {
  I.amOnPage('/');

  I.seeElement('restaurant-card');
  I.click(locate('restaurant-card').first());
});

Scenario('Add a review', async ({ I }) => {
  const countBeforeReview = await I.grabNumberOfVisibleElements('review-card');

  I.seeElement('#nameInput');
  I.fillField('#nameInput', 'John');

  I.seeElement('#reviewInput');
  I.fillField('#reviewInput', 'Makanannya enak');

  I.click('#reviewButton');
  const countAfterReview = await I.grabNumberOfVisibleElements('review-card');

  assert.strictEqual(countBeforeReview + 1, countAfterReview);
});
