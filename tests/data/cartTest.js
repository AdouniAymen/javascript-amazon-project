import { updateCart,cart,loadFromStorage } from "../../scripts/cart.js";

describe('add to cart', () => {
  it('add an existing product', () => {
    spyOn(localStorage, 'setItem');// Mocks this to prevent set anything in local storage
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOption: '1'
      }]);
    })//Mocks locarlStorage.getItem to an empty one to empty the cart
    loadFromStorage();
    console.log(cart);// []
    updateCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart.length).toEqual(1);
    console.log(cart);// cart = [{id:'...',quantity:1}];
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    
  });
  it('add a new product', () => {
    spyOn(localStorage, 'setItem');// Mocks this to prevent set anything in local storage
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    })//Mocks locarlStorage.getItem to an empty one to empty the cart
    loadFromStorage();
    console.log(cart);// []
    updateCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart.length).toEqual(1);
    console.log(cart);// cart = [{id:'...',quantity:1}];
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  })
})