Feature('Review restaurant');
const assert = require('assert');

Before(({ I }) => {
  I.amOnPage('/');
  I.wait(1);

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
  I.wait(2);
  const countAfterReview = await I.grabNumberOfVisibleElements('review-card');
  I.wait(2);

  assert.strictEqual(countBeforeReview + 1, countAfterReview);
});
