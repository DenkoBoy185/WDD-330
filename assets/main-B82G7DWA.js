import{r as s,u as i}from"./utils-CQsXoPNN.js";import{P as c}from"./ProductData-Dx0C3TkS.js";function n(t){return`<li class="product-card">
    <a href="product_pages/index.html?product=${t.Id}">
      <img src="${t.Image}" alt="Image of ${t.Name}">
      <h3 class="card__brand">${t.Brand.Name}</h3>
      <h2 class="card__name">${t.NameWithoutBrand}</h2>
      <p class="product-card__price">$${t.FinalPrice}</p>
    </a>
  </li>`}class o{constructor(a,e,r){this.category=a,this.dataSource=e,this.listElement=r}async init(){const a=await this.dataSource.getData();this.renderList(a)}renderList(a){s(n,this.listElement,a,"afterbegin",!0)}}const d=new c("tents"),l=document.querySelector(".product-list"),m=new o("tents",d,l);m.init();i();
