/**
 * main.js
 * Product filter and sort functionality for the Sleep Outside homepage.
 * Task: Add product search filter and sort controls
 */

document.addEventListener('DOMContentLoaded', () => {
  const productList = document.querySelector('.product-list');
  if (!productList) return;

  // Cache all product cards from the DOM
  const allCards = Array.from(productList.querySelectorAll('.product-card'));

  /**
   * Extract the numeric price from a product card element.
   * @param {Element} card
   * @returns {number}
   */
  function getPrice(card) {
    const priceEl = card.querySelector('.product-card__price');
    if (!priceEl) return 0;
    return parseFloat(priceEl.textContent.replace(/[^0-9.]/g, '')) || 0;
  }

  /**
   * Extract the product name text from a card.
   * @param {Element} card
   * @returns {string}
   */
  function getName(card) {
    const nameEl = card.querySelector('.card__name');
    const brandEl = card.querySelector('.card__brand');
    return ((nameEl ? nameEl.textContent : '') + ' ' + (brandEl ? brandEl.textContent : '')).toLowerCase();
  }

  /**
   * Re-render the product list based on current filter + sort state.
   */
  function applyFilterAndSort() {
    const query = document.getElementById('product-search').value.toLowerCase().trim();
    const sortVal = document.getElementById('product-sort').value;

    // Filter
    let filtered = allCards.filter(card => getName(card).includes(query));

    // Sort
    if (sortVal === 'price-asc') {
      filtered.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sortVal === 'price-desc') {
      filtered.sort((a, b) => getPrice(b) - getPrice(a));
    } else if (sortVal === 'name-asc') {
      filtered.sort((a, b) => getName(a).localeCompare(getName(b)));
    }

    // Clear and re-append in new order
    productList.innerHTML = '';
    if (filtered.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'no-results';
      empty.textContent = 'No products match your search.';
      productList.appendChild(empty);
    } else {
      filtered.forEach(card => productList.appendChild(card));
    }
  }

  // Attach event listeners to the controls
  document.getElementById('product-search').addEventListener('input', applyFilterAndSort);
  document.getElementById('product-sort').addEventListener('change', applyFilterAndSort);
});
