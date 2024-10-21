class Cart {

  cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  localStorageKey;//undefined
  //for jasmin testing
  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || []
  }
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }
  
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
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }
    
  totalCartsQuantity() {
        let CartsQuantity = 0;
        this.cartItems.map(item => CartsQuantity += item.quantity)
        return CartsQuantity;
  }
  ///    
  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    localStorage.setItem('cartQuantity', JSON.stringify(this.totalCartsQuantity()));
  }
  ///
  removeFromCart(productId) {
        this.cartItems = this.cartItems.filter(item => item.id !== productId);
        this.saveToStorage();
        return this.cartItems;
  }
  ///
  updateCartDeliveryOption (productId, deliveryOptionId) {
        let matchingItem = this.cartItems.find(item => item.id === productId);
        if (matchingItem) {
          matchingItem.deliveryOptionId = deliveryOptionId;
        };
        this.saveToStorage();
  }

}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');
// cart.localStorageKey = 'cart-oop';
// businessCart.localStorageKey = 'cart-business';

// cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
  
console.log(businessCart instanceof Cart);

