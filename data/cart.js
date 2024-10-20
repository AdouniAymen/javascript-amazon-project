export let cart = JSON.parse(localStorage.getItem('cart')) || [];
//for jasmin testing
loadFromStorage();
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

// update cart function
export const updateCart = (productId, selectValue) => {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) { existingItem.quantity += selectValue }
    else {
      cart.push({
        id : productId,
        quantity: selectValue,
        deliveryOptionId: '1'
      })
    }
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function totalCartsQuantity() {
      let CartsQuantity = 0;
      cart.map(item => CartsQuantity += item.quantity)
      return CartsQuantity;
};
///    
export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cartQuantity', JSON.stringify(totalCartsQuantity()));
}
///
export function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveToStorage();
  return cart;
}
///
export function updateCartDeliveryOption (productId, deliveryOptionId) {
  let matchingItem = cart.find(item => item.id === productId);
  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
  };
  saveToStorage();
}