/**
 * product.js
 * Product detail page logic for Sleep Outside.
 * Features:
 *  - Add to cart (appends to array, no overwrite)
 *  - Duplicate prevention
 *  - Visual feedback on Add to Cart button
 *  - Save for Later (wishlist) button
 *  - Cart count badge sync
 */

import { setLocalStorage, getLocalStorage, updateCartCount } from './utils.mjs';
import ProductData from './ProductData.mjs';
import { addToWishList, isInWishList } from './WishList.mjs';

const dataSource = new ProductData('tents');

/**
 * Append a product to the so-cart array.
 * Prevents exact duplicates (same Id).
 * @param {Object} product
 */
function addProductToCart(product) {
  const cart = getLocalStorage('so-cart') || [];
  const alreadyInCart = cart.find((item) => item.Id === product.Id);
  if (!alreadyInCart) {
    cart.push(product);
    setLocalStorage('so-cart', cart);
  }
  updateCartCount();
}

/** Handle the Add to Cart button click with brief visual feedback. */
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.currentTarget.dataset.id);
  addProductToCart(product);

  const btn = document.getElementById('addToCart');
  const original = btn.textContent;
  btn.textContent = '✓ Added to Cart!';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 1500);
}

/** Handle the Save for Later (wishlist) button click. */
async function saveForLaterHandler() {
  const productId = document.getElementById('addToCart').dataset.id;
  const product = await dataSource.findProductById(productId);
  const btn = document.getElementById('saveForLater');

  const added = addToWishList(product);
  if (added) {
    btn.textContent = '❤ Saved!';
    btn.classList.add('btn-wishlist--saved');
  } else {
    btn.textContent = '❤ Already Saved';
  }
  btn.disabled = true;
}

// ── Init ────────────────────────────────────────────────────────

// Sync badge on page load
updateCartCount();

// Add to Cart
document.getElementById('addToCart').addEventListener('click', addToCartHandler);

// Save for Later
const saveBtn = document.getElementById('saveForLater');
if (saveBtn) {
  saveBtn.addEventListener('click', saveForLaterHandler);

  // Reflect existing wishlist state immediately
  const productId = document.getElementById('addToCart').dataset.id;
  if (isInWishList(productId)) {
    saveBtn.textContent = '❤ Saved';
    saveBtn.disabled = true;
    saveBtn.classList.add('btn-wishlist--saved');
  }
}

