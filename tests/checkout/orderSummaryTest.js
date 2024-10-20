import { loadFromStorage,cart } from '../../scripts/cart.js';
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';

describe('test suite: renderOrderSummary', () => {
  const productId1 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"; 
  const productId2 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e"; 
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    document.querySelector('.js-test-container').innerHTML =
    `
    <div class="js-checkout-header"></div>
    <div class="order-summary"></div>
    <div class="js-payment-summary"></div>`;
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        deliveryOptionId: "1",
        id: productId1,
        quantity: 2
      }, {
        deliveryOptionId: "1",
        id: productId2,
        quantity: 1
      }
    ])
  })
  loadFromStorage();
  renderOrderSummary();
})
afterEach(() => {
  document.querySelector('.js-test-container').innerHTML = '';
})
  it('displays the carts', () => {
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toContain('Intermediate Size Basketball');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
    expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toContain('Adults Plain Cotton T-Shirt - 2 Pack');
    expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toContain('$20.95');
    expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toContain('$7.99');

  })
  it('removes a product', () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual(productId2);
  })
})  