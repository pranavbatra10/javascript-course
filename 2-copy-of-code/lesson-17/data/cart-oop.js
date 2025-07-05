// oops- object oriented programming system, isme sara code objects mai daal dete h
// 'let cart;'   this is a short cut for 'let cart = undefined;'
// so, main points of converting a normal code to oops code, we just have to make objects and after every object, we have to add comma(,) and then add another object 
// and  we have to use (this) for reference to the parent object
// and we have to use object syntax like (property: value)

// in oops we use pascal case - every word starts with a capital letter inc the first word
function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,          // from (export let cart = undefined;) to cartItems: undefined, // here we dont use export becayuse in object there is syntax as (property: value) 

    loadFromStorage() {    // idhar bhi we removed 'export function loadFromStorage() {}' and convert it to syntax (property: value) so we converted it to `loadFromStorage: function() {}` then shortcut of this syntax is shorthand property so we dont have to specify function here and our code on left is shortcut     
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));    // 'this' refers to the outer object
                                                                              // so other than cart.cartItems we refer this.cartItems so if the name cart changes, the code still works
      if (!this.cartItems) {
        this.cartItems = [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }];
      }
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1'
        });
      }

      this.saveToStorage();
    },

    removeFromCart(productId) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;

      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
