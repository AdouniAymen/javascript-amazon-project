import { cart } from '../cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach(item => {
    const product = getProduct(item.id);
    productPriceCents += product.priceCents * item.quantity;
    const deliveryOption = getDeliveryOption(item.deliveryOptionId);
    console.log(item)
    console.log(deliveryOption);
    shippingPriceCents += deliveryOption.priceCents;
    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const Tax = totalBeforeTax * 0.1;
    const orderTotal = totalBeforeTax + Tax;
    //
    const paymentSummaryHTML = `
              <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$42.75</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$4.99</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
`
  });
}