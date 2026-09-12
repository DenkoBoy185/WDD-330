import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }
  addToCart() {
    let cartItems = getLocalStorage('so-cart');
    if (!cartItems) {
      cartItems = [];
    }
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);
  }
  renderProductDetails() {
    document.querySelector('#productName').textContent =
      this.product.NameWithoutBrand;
    document.querySelector('#productNameWithoutBrand').textContent =
      this.product.NameWithoutBrand;
    document.querySelector('#productImage').src = this.product.Image;
    document.querySelector('#productImage').alt = this.product.Name;
    document.querySelector('#productFinalPrice').textContent =
      this.product.FinalPrice;
    document.querySelector('#productColorName').textContent =
      this.product.Colors[0].ColorName;
    document.querySelector('#productDescriptionHtmlSimple').innerHTML =
      this.product.DescriptionHtmlSimple;
    document.querySelector('#addToCart').dataset.id = this.product.Id;
    document.querySelector('h3').textContent = this.product.Brand.Name;
  }
}
