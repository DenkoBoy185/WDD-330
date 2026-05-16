/**
 * StarRating module
 * Renders a star rating widget for product cards.
 * Task: Add Star Rating Display on Product Cards
 */

/**
 * Generates an HTML string of filled/empty stars.
 * @param {number} rating - A number between 0 and 5
 * @param {number} reviewCount - Total number of reviews
 * @returns {string} HTML string for the star rating
 */
export function renderStars(rating, reviewCount = 0) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  const full = '★'.repeat(fullStars);
  const half = halfStar ? '⭑' : '';
  const empty = '☆'.repeat(emptyStars);

  return `
    <div class="star-rating" aria-label="Rating: ${rating} out of 5 stars">
      <span class="stars filled" aria-hidden="true">${full}${half}${empty}</span>
      <span class="review-count">(${reviewCount})</span>
    </div>`;
}

/**
 * Product ratings data (simulates data that would come from an API)
 * Keyed by the product page href
 */
export const productRatings = {
  'marmot-ajax-3': { rating: 4.5, reviewCount: 128 },
  'northface-talus-4': { rating: 4.0, reviewCount: 87 },
  'northface-alpine-3': { rating: 4.8, reviewCount: 213 },
  'cedar-ridge-rimrock-2': { rating: 3.5, reviewCount: 44 },
};

/**
 * Inject star ratings into all product cards on the page.
 */
export function injectStarRatings() {
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach((card) => {
    const link = card.querySelector('a');
    if (!link) return;

    // Extract product ID from href, e.g. "product_pages/marmot-ajax-3.html" → "marmot-ajax-3"
    const href = link.getAttribute('href');
    const productId = href.split('/').pop().replace('.html', '');

    const ratingData = productRatings[productId];
    if (!ratingData) return;

    // Insert the star widget before the price
    const priceEl = card.querySelector('.product-card__price');
    if (priceEl) {
      priceEl.insertAdjacentHTML(
        'beforebegin',
        renderStars(ratingData.rating, ratingData.reviewCount)
      );
    }
  });
}
