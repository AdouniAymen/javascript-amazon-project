import { cart, totalCartsQuantity, removeFromCart, saveToStorage, updateCartDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import currencyFormat from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary() {

    // render checkout header
    renderCheckoutHeader();
  
    // Generate HTML
    let cartSummary = ''  ;
    cart.forEach((item) => {
    const itemId = item.id;
      const matchingproduct = getProduct(itemId);
      
    // Generate Delivery Date
    const deliveryOptionId = item.deliveryOptionId; 
    const deliveryOption = getDeliveryOption(deliveryOptionId);
      calculateDeliveryDate(deliveryOption);      
    //

      cartSummary +=`<div class="js-cart-item-container-${matchingproduct.id} js-cart-item-container">
                <div class="delivery-date">
                  Delivery date: ${calculateDeliveryDate(deliveryOption)}
                  </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src=${matchingproduct.image}>

                  <div class="cart-item-details">
                    <div class="product-name js-product-name-${matchingproduct.id}">
                      ${matchingproduct.name}
                      </div>
                      <div class="product-price js-product-price-${matchingproduct.id}">
                      ${matchingproduct.getPrice()}
                    </div>
                    <div class="product-quantity
                    js-product-quantity-${matchingproduct.id}">
                      <span class="quantity-display">
                        Quantity: <span class="quantity-label js-quantity-label-${matchingproduct.id}">${item.quantity}</span>
                      </span>
                      <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${matchingproduct.id}">
                        Update
                      </span>
                      <input class="update-input js-update-input-${matchingproduct.id}" data-product-id="${matchingproduct.id}" style="width:25px">
                      <span class="update-save js-update-save link-primary" data-product-id="${matchingproduct.id}">save</span>
                      <span class="delete-quantity-link js-delete-quantity-link
                      js-delete-link-${matchingproduct.id} link-primary" data-product-id="${matchingproduct.id}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingproduct,item)}
                  </div>
                </div>
              </div>` });
    document.querySelector('.order-summary').innerHTML = cartSummary;
    // Generate delivery options
    function deliveryOptionsHTML(matchingproduct, item) {
      let html = '';
      deliveryOptions.forEach(deliveryOption => {
        calculateDeliveryDate(deliveryOption);
        const deliveryPrice = deliveryOption.priceCents === 0
          ? 'FREE '
          : `$${currencyFormat(deliveryOption.priceCents)} -`;
        const isChecked = deliveryOption.id === item.deliveryOptionId;

        html += `<div class="delivery-option js-delivery-option"
                      data-product-id="${matchingproduct.id}"
                      data-delivery-option-id="${deliveryOption.id}">
                      <input type="radio"
                        ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingproduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${calculateDeliveryDate(deliveryOption)}
                        </div>
                        <div class="delivery-option-price">
                          ${deliveryPrice} Shipping
                        </div>
                      </div>
                    </div>
    `
      });
      return html;
    }
    // update link (hide the update link and get the input and save link appear)
    document.querySelector('.order-summary').addEventListener('click',(event) => {
      if (event.target.classList.contains('js-update-quantity-link')) {
        let productId = event.target.dataset.productId;
        document.querySelector(`.cart-item-container-${productId}`).classList.add('is-editing');  
      }
    })
    // save link(get the update link appear and hide the input and save link)
  document.querySelector('.order-summary').addEventListener('click', (event) => {
    if (event.target.classList.contains('js-update-save')) {
      let productId = event.target.dataset.productId;
      document.querySelector(`.cart-item-container-${productId}`).classList.remove('is-editing');
      const newQuantity = Number(document.querySelector(`.js-update-input-${productId}`).value);
      if (newQuantity >= 0 && newQuantity < 1000) {
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
        //update cart item quantity
        const itemToUpdate = cart.find(item => item.id === productId);
        if (itemToUpdate) { itemToUpdate.quantity = newQuantity; }
        totalCartsQuantity();
        document.querySelector('.return-to-home-link').innerHTML = `${totalCartsQuantity()} items`;
        saveToStorage();
        renderPaymentSummary();
      };
    };
  });

    // Keydown event listener for the update input quantity  
    document.querySelector('.order-summary').addEventListener('keydown', (event) => {  
      if (event.target.classList.contains('update-input') && event.key === 'Enter') {
        let productId = event.target.dataset.productId;
        document.querySelector(`.cart-item-container-${productId}`).classList.remove('is-editing');
        const newQuantity = Number(document.querySelector(`.js-update-input-${productId}`).value);
        if (newQuantity >= 0 && newQuantity < 1000) {
          document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
          //update cart item quantity
          const itemToUpdate = cart.find(item => item.id === productId);
          if (itemToUpdate) { itemToUpdate.quantity = newQuantity; }
          totalCartsQuantity();
          renderCheckoutHeader();
          saveToStorage();
          renderPaymentSummary();
        };
      };
    });  
  
    // delete link
  document.querySelector('.order-summary').addEventListener('click', (event) => {
    if (event.target.classList.contains('js-delete-quantity-link')) {
      let productId = event.target.dataset.productId;
      removeFromCart(productId);
      renderPaymentSummary();
      renderOrderSummary();
      renderCheckoutHeader();
    }
  });

    // choose delivery option
    document.querySelectorAll('.js-delivery-option').forEach(element => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset
        updateCartDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}