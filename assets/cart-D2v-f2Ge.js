import{g as c}from"./utils-B_kqwxmC.js";function o(){const t=c("so-cart");if(t&&t.length>0){const r=t.map(e=>l(e));document.querySelector(".product-list").innerHTML=r.join("");let a=0;t.forEach(e=>{a+=e.FinalPrice}),document.querySelector(".cart-footer").classList.remove("hide"),document.querySelector(".cart-total").textContent=`Total: $${a.toFixed(2)}`}else document.querySelector(".product-list").innerHTML="<p>Your cart is empty.</p>"}function l(t){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`}o();
