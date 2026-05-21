/**
 * WishList.mjs
 * Save-for-later / wishlist functionality using localStorage.
 * Task: Add wishlist / save for later feature
 */

import { getLocalStorage, setLocalStorage } from './utils.mjs';

const WISHLIST_KEY = 'so-wishlist';

/** Return the current wishlist array (never null). */
export function getWishList() {
  return getLocalStorage(WISHLIST_KEY) || [];
}

/**
 * Add a product to the wishlist if it isn't already there.
 * @param {Object} product
 * @returns {boolean} true if added, false if it was already saved
 */
export function addToWishList(product) {
  const wishlist = getWishList();
  const exists = wishlist.find((item) => item.Id === product.Id);
  if (!exists) {
    wishlist.push(product);
    setLocalStorage(WISHLIST_KEY, wishlist);
    return true;
  }
  return false;
}

/**
 * Remove a product from the wishlist by its ID.
 * @param {string} productId
 */
export function removeFromWishList(productId) {
  const wishlist = getWishList().filter((item) => item.Id !== productId);
  setLocalStorage(WISHLIST_KEY, wishlist);
}

/**
 * Move a wishlist item into the cart, then remove it from the wishlist.
 * @param {string} productId
 */
export function moveWishListItemToCart(productId) {
  const wishlist = getWishList();
  const item = wishlist.find((i) => i.Id === productId);
  if (!item) return;

  const cart = getLocalStorage('so-cart') || [];
  const alreadyInCart = cart.find((c) => c.Id === productId);
  if (!alreadyInCart) {
    cart.push(item);
    setLocalStorage('so-cart', cart);
  }
  removeFromWishList(productId);
}

/**
 * Check whether a product is already in the wishlist.
 * @param {string} productId
 * @returns {boolean}
 */
export function isInWishList(productId) {
  return getWishList().some((item) => item.Id === productId);
}

/**
 * Render the wishlist section inside #wishlist-section.
 * Attaches remove + move-to-cart listeners automatically.
 */
export function renderWishListSection() {
  const container = document.getElementById('wishlist-section');
  if (!container) return;

  const wishlist = getWishList();

  if (!wishlist.length) {
    container.innerHTML =
      '<p class="wishlist-empty">No saved items yet.</p>';
    return;
  }

  const items = wishlist
    .map(
      (item) => `
      <li class="wishlist-card divider">
        <img
          src="${item.Image}"
          alt="${item.Name}"
          class="wishlist-card__image"
        />
        <div class="wishlist-card__info">
          <h3 class="card__name">${item.Name}</h3>
          <p class="wishlist-card__price">$${item.FinalPrice}</p>
        </div>
        <div class="wishlist-card__actions">
          <button
            class="wishlist-move-btn"
            data-id="${item.Id}"
            aria-label="Move ${item.Name} to cart"
          >Move to Cart</button>
          <button
            class="wishlist-remove-btn btn-secondary"
            data-id="${item.Id}"
            aria-label="Remove ${item.Name} from wishlist"
          >✕ Remove</button>
        </div>
      </li>`,
    )
    .join('');

  container.innerHTML = `<ul class="wishlist-list">${items}</ul>`;

  // Attach remove listeners
  container.querySelectorAll('.wishlist-remove-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      removeFromWishList(e.currentTarget.dataset.id);
      renderWishListSection();
      // Update cart count badge (cart count unchanged, but badge refresh is harmless)
      import('./utils.mjs').then(({ updateCartCount }) => updateCartCount());
    });
  });

  // Attach move-to-cart listeners
  container.querySelectorAll('.wishlist-move-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      moveWishListItemToCart(e.currentTarget.dataset.id);
      renderWishListSection();
      import('./utils.mjs').then(({ updateCartCount }) => updateCartCount());
    });
  });
}
