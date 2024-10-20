import { cart, totalCartsQuantity } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import currencyFormat from '../utils/money.js'

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach(item => {
    const product = getProduct(item.id);
    productPriceCents += product.priceCents * item.quantity;
    const deliveryOption = getDeliveryOption(item.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const Tax = totalBeforeTax * 0.1;
  const orderTotal = totalBeforeTax + Tax;
  
  const paymentSummaryHTML = `
              <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalCartsQuantity()}):</div>
            <div class="payment-summary-money">$ ${currencyFormat(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$ ${currencyFormat(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$ ${currencyFormat(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$ ${currencyFormat(Tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$ ${currencyFormat(orderTotal)}</div>
          </div>
          <button class="place-order-button button-primary">
            Place your order
          </button>
`
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}