/**
 * cart.js
 * Renders and manages the shopping cart page.
 * Features:
 *  - Null-safe cart rendering (no crash on empty cart)
 *  - Empty-cart message with link back to shop
 *  - Remove-from-cart buttons
 *  - Quantity stepper (+/-) per item with localStorage persistence
 *  - Live cart total (respects quantities)
 *  - Wishlist / Save-for-Later section
 *  - Cart count badge sync
 */

import { getLocalStorage, setLocalStorage, updateCartCount } from './utils.mjs';
import { renderWishListSection } from './WishList.mjs';

const QTY_KEY = 'so-cart-qty';

/** Return the quantity map object { [productId]: qty }. */
function getQtyMap() {
  return getLocalStorage(QTY_KEY) || {};
}

/** Persist the quantity map. */
function saveQtyMap(map) {
  setLocalStorage(QTY_KEY, map);
}

/** Get quantity for a specific product (default 1). */
function getQty(productId) {
  const map = getQtyMap();
  return map[productId] || 1;
}

/** Set quantity for a specific product (min 1). */
function setQty(productId, qty) {
  const map = getQtyMap();
  map[productId] = Math.max(1, qty);
  saveQtyMap(map);
}

/** Build one cart row from a product object. */
function cartItemTemplate(item, index) {
  const qty = getQty(item.Id);
  const lineTotal = (parseFloat(item.FinalPrice) * qty).toFixed(2);
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <div class="cart-card__qty-control" data-id="${item.Id}">
        <button class="qty-btn qty-decrement" aria-label="Decrease quantity">−</button>
        <span class="qty-value">${qty}</span>
        <button class="qty-btn qty-increment" aria-label="Increase quantity">+</button>
      </div>
      <p class="cart-card__price" data-id="${item.Id}">$${lineTotal}</p>
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
  const removed = cart.splice(index, 1);

  // Clean up qty entry for removed item
  if (removed.length) {
    const map = getQtyMap();
    delete map[removed[0].Id];
    saveQtyMap(map);
  }

  setLocalStorage('so-cart', cart);
  renderCartContents();
  updateCartCount();
}

/** Recalculate and display the running cart total (respects quantities). */
function renderCartTotal(cartItems) {
  const total = cartItems.reduce((sum, item) => {
    return sum + parseFloat(item.FinalPrice) * getQty(item.Id);
  }, 0);
  const totalEl = document.getElementById('cart-total');
  if (totalEl) {
    totalEl.textContent = `Total: $${total.toFixed(2)}`;
  }
}

/**
 * Update just the price cell and total for a product without a full re-render.
 * Called by qty stepper buttons.
 */
function updateLinePrice(productId, unitPrice, cartItems) {
  const qty = getQty(productId);
  const lineTotal = (parseFloat(unitPrice) * qty).toFixed(2);

  // Update qty display
  const control = document.querySelector(`.cart-card__qty-control[data-id="${productId}"]`);
  if (control) {
    control.querySelector('.qty-value').textContent = qty;
  }

  // Update line price display
  const priceEl = document.querySelector(`.cart-card__price[data-id="${productId}"]`);
  if (priceEl) {
    priceEl.textContent = `$${lineTotal}`;
  }

  renderCartTotal(cartItems);
}

/** Attach quantity stepper listeners after render. */
function attachQtyListeners(cartItems) {
  document.querySelectorAll('.qty-increment').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const control = e.currentTarget.closest('.cart-card__qty-control');
      const id = control.dataset.id;
      const item = cartItems.find((i) => i.Id === id);
      if (!item) return;
      setQty(id, getQty(id) + 1);
      updateLinePrice(id, item.FinalPrice, cartItems);
    });
  });

  document.querySelectorAll('.qty-decrement').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const control = e.currentTarget.closest('.cart-card__qty-control');
      const id = control.dataset.id;
      const item = cartItems.find((i) => i.Id === id);
      if (!item) return;
      const newQty = getQty(id) - 1;
      if (newQty < 1) return; // Don't go below 1
      setQty(id, newQty);
      updateLinePrice(id, item.FinalPrice, cartItems);
    });
  });
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

  // Attach qty stepper listeners
  attachQtyListeners(cartItems);

  renderCartTotal(cartItems);
}

// ── Init ────────────────────────────────────────────────────────
renderCartContents();
updateCartCount();
renderWishListSection();
