import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');

    // Calculate total
    let total = 0;
    cartItems.forEach(item => {
      total += item.FinalPrice;
    });

    // Show footer and total
    const cartFooter = document.querySelector('.cart-footer');
    cartFooter.classList.remove('hide');
    document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;

    // Add event listeners for remove buttons
    document.querySelectorAll('.cart-card__remove').forEach(btn => {
      btn.addEventListener('click', removeFromCart);
    });
  } else {
    document.querySelector('.product-list').innerHTML = '<p>Your cart is empty.</p>';
    const cartFooter = document.querySelector('.cart-footer');
    if (cartFooter) {
      cartFooter.classList.add('hide');
    }
  }
}

function removeFromCart(e) {
  const index = parseInt(e.target.dataset.index);
  const cartItems = getLocalStorage('so-cart');
  cartItems.splice(index, 1);
  setLocalStorage('so-cart', cartItems);
  renderCartContents();
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-index="${index}">X</span>
</li>`;

  return newItem;
}

renderCartContents();
