export let cart = JSON.parse(localStorage.getItem('cart')) || [];

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