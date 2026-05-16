import"./style-DBrVy-ya.js";function i(e,n=0){const t=Math.floor(e),o=e%1>=.5?1:0,c=5-t-o,r="★".repeat(t),a=o?"⭑":"",s="☆".repeat(c);return`
    <div class="star-rating" aria-label="Rating: ${e} out of 5 stars">
      <span class="stars filled" aria-hidden="true">${r}${a}${s}</span>
      <span class="review-count">(${n})</span>
    </div>`}const u={"marmot-ajax-3":{rating:4.5,reviewCount:128},"northface-talus-4":{rating:4,reviewCount:87},"northface-alpine-3":{rating:4.8,reviewCount:213},"cedar-ridge-rimrock-2":{rating:3.5,reviewCount:44}};function l(){document.querySelectorAll(".product-card").forEach(n=>{const t=n.querySelector("a");if(!t)return;const c=t.getAttribute("href").split("/").pop().replace(".html",""),r=u[c];if(!r)return;const a=n.querySelector(".product-card__price");a&&a.insertAdjacentHTML("beforebegin",i(r.rating,r.reviewCount))})}document.addEventListener("DOMContentLoaded",()=>{l()});
