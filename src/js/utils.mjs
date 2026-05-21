// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

/**
 * Return the number of items currently in the so-cart.
 * @returns {number}
 */
export function getCartCount() {
  const cart = getLocalStorage('so-cart');
  return Array.isArray(cart) ? cart.length : 0;
}

/**
 * Read the cart from localStorage and update the #cart-count badge
 * in the page header. Hides the badge when the cart is empty.
 */
export function updateCartCount() {
  const count = getCartCount();
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'inline-flex' : 'none';
}
