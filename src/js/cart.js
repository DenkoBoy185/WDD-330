import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
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
  } else {
    document.querySelector('.product-list').innerHTML = '<p>Your cart is empty.</p>';
  }
}

function cartItemTemplate(item) {
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
</li>`;

  return newItem;
}

renderCartContents();
