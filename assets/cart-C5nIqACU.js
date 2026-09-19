import{g as c,s as n}from"./utils-u2kvCHHw.js";function o(){const t=c("so-cart");if(t&&t.length>0){const e=t.map((a,s)=>d(a,s));document.querySelector(".product-list").innerHTML=e.join("");let r=0;t.forEach(a=>{r+=a.FinalPrice}),document.querySelector(".cart-footer").classList.remove("hide"),document.querySelector(".cart-total").textContent=`Total: $${r.toFixed(2)}`,document.querySelectorAll(".cart-card__remove").forEach(a=>{a.addEventListener("click",l)})}else{document.querySelector(".product-list").innerHTML="<p>Your cart is empty.</p>";const e=document.querySelector(".cart-footer");e&&e.classList.add("hide")}}function l(t){const e=parseInt(t.target.dataset.index),r=c("so-cart");r.splice(e,1),n("so-cart",r),o()}function d(t,e){return`<li class="cart-card divider">
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
  <span class="cart-card__remove" data-index="${e}">X</span>
</li>`}o();
