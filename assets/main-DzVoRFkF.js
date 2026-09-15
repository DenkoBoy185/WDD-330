import{r as s}from"./utils-B_kqwxmC.js";import{P as i}from"./ProductData-Dx0C3TkS.js";function c(t){return`<li class="product-card">
    <a href="product_pages/index.html?product=${t.Id}">
      <img src="${t.Image}" alt="Image of ${t.Name}">
      <h3 class="card__brand">${t.Brand.Name}</h3>
      <h2 class="card__name">${t.NameWithoutBrand}</h2>
      <p class="product-card__price">$${t.FinalPrice}</p>
    </a>
  </li>`}class n{constructor(e,a,r){this.category=e,this.dataSource=a,this.listElement=r}async init(){const e=await this.dataSource.getData();this.renderList(e)}renderList(e){s(c,this.listElement,e,"afterbegin",!0)}}const o=new i("tents"),d=document.querySelector(".product-list"),l=new n("tents",o,d);l.init();
