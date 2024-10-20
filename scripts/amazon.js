import { products } from "../data/products.js";
import currencyFormat from "./utils/money.js";
import { cart, updateCart, saveToStorage, totalCartsQuantity } from "../data/cart.js";
//display quantity in the bascket
document.querySelector('.cart-quantity').innerHTML = JSON.parse(localStorage.getItem('cartQuantity')) || ''; 

//Genetrate HTML
let productsHTML = '';
products.forEach(product => {
productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${(product.rating.stars)*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${currencyFormat(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="select-value-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
`
})
document.querySelector('.products-grid').innerHTML = productsHTML;
// the Add to cart button
document.querySelectorAll('.add-to-cart-button').forEach(button => {
  button.addEventListener('click', () => {
    const { productId } = button.dataset;
    const selectValue = Number(document.querySelector(`.select-value-${productId}`).value);
    updateCart(productId, selectValue);
    //display Added message
    let timeId;
    if (timeId) { clearTimeout(timeId) }
    else {
      document.querySelector(`.js-added-to-cart-${productId}`).style.opacity = '1';
      timeId = setTimeout(() => { document.querySelector(`.js-added-to-cart-${productId}`).style.opacity = '0' }, 2000)
    }
    console.log(cart);
    // update quantity to the basket
    document.querySelector('.cart-quantity').innerHTML = totalCartsQuantity(); 
    // save the cart and total item quantity in the storage
    saveToStorage();
  })
})
