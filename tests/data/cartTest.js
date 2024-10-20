import { updateCart,cart,loadFromStorage,removeFromCart } from "../../scripts/cart.js";

describe('test suite:add to cart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');// Mocks this to prevent set anything in local storage
  })
  it('add an existing product', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOption: '1'
      }]);
    })//Mocks locarlStorage.getItem to an empty one to empty the cart
    loadFromStorage();
    updateCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOption: '1'
    }]));
  });
  it('add a new product', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    })//Mocks locarlStorage.getItem to an empty one to empty the cart
    loadFromStorage();
    updateCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })
})
describe('test suite: remove from cart', () => {
  const productId1 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"; 
  const productId2 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e"; 

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        id: productId1,
        quantity: 2,
        deliveryOptionId: "1"
      }, {
        id: productId2,
        quantity: 1,
        deliveryOptionId: "1"
      }
    ])
    })
    loadFromStorage();
  })
  it('removes an existing item', () => {
    removeFromCart(productId1);
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual(productId2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
 })
})
