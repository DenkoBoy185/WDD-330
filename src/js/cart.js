/**
 * cart.js
 * Renders and manages the shopping cart page.
 * Features:
 *  - Null-safe cart rendering (no crash on empty cart)
 *  - Empty-cart message with link back to shop
 *  - Remove-from-cart buttons
 *  - Live cart total
 *  - Wishlist / Save-for-Later section
 *  - Cart count badge sync
 */

import { getLocalStorage, setLocalStorage, updateCartCount } from './utils.mjs';
import { renderWishListSection } from './WishList.mjs';

/** Build one cart row from a product object. */
function cartItemTemplate(item, index) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button
        class="cart-remove-btn"
        data-index="${index}"
        aria-label="Remove ${item.Name} from cart"
      >✕</button>
    </li>`;
}

/** Remove a single item from the cart by its list index and re-render. */
function removeFromCart(e) {
  const index = parseInt(e.currentTarget.dataset.index, 10);
  const cart = getLocalStorage('so-cart') || [];
  cart.splice(index, 1);
  setLocalStorage('so-cart', cart);
  renderCartContents();
  updateCartCount();
}

/** Render the running cart total beneath the list. */
function renderCartTotal(cartItems) {
  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.FinalPrice),
    0,
  );
  const totalEl = document.getElementById('cart-total');
  if (totalEl) {
    totalEl.textContent = `Total: $${total.toFixed(2)}`;
  }
}

/** Main render function — reads localStorage and paints the full cart UI. */
function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const listEl = document.querySelector('.product-list');
  if (!listEl) return;

  if (!cartItems.length) {
    listEl.innerHTML = `
      <li class="cart-empty">
        Your cart is empty.
        <a href="../index.html">Continue shopping →</a>
      </li>`;
    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = '';
    return;
  }

  listEl.innerHTML = cartItems
    .map((item, index) => cartItemTemplate(item, index))
    .join('');

  // Attach remove-button listeners
  listEl.querySelectorAll('.cart-remove-btn').forEach((btn) => {
    btn.addEventListener('click', removeFromCart);
  });

  renderCartTotal(cartItems);
}

// ── Init ────────────────────────────────────────────────────────
renderCartContents();
updateCartCount();
renderWishListSection();

