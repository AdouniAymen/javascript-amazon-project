function Cart(localStorageKey) {
const cart = {
  
  cartItems : JSON.parse(localStorage.getItem(localStorageKey)) || [],
  //for jasmin testing
  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || []
  },
  
  // update cart function
  updateCart (productId, selectValue){
    const existingItem = this.cartItems.find(item => item.id === productId);
      if (existingItem) { existingItem.quantity += selectValue }
      else {
        this.cartItems.push({
          id : productId,
          quantity: selectValue,
          deliveryOptionId: '1'
        })
      }
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    
  totalCartsQuantity() {
        let CartsQuantity = 0;
        this.cartItems.map(item => CartsQuantity += item.quantity)
        return CartsQuantity;
  },
  ///    
  saveToStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    localStorage.setItem('cartQuantity', JSON.stringify(this.totalCartsQuantity()));
  },
  ///
  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveToStorage();
    return this.cartItems;
  },
  ///
  updateCartDeliveryOption (productId, deliveryOptionId) {
    let matchingItem = this.cartItems.find(item => item.id === productId);
    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
    };
    this.saveToStorage();
  }
}
return cart;
}
cart.loadFromStorage();
businessCart.loadFromStorage();
const cart = Cart();
const businessCart = Cart();

console.log(cart);
console.log(businessCart);
  


