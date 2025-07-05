// first we copy pasted all the code from cart-oop.js
// class = object generator
// in class we dont need to put a comma (,) at the end of every object {} like opps

class Cart {
  cartItems;
  #localStorageKey;  
  //  this # will help in not letting the value of localStorageKey change , when working on a team soneone would accidently change it so .....
  // and whenever we are using this key, we have to add # before that key as used below
  // as we have removed the function so localStorageKey isnt a parameter anymore so now we have to set it as a variable
// constructor lets us put this setup code inside the class// everytime we generate an object , constructor runs the setup code
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

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
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

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
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }

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
}

const cart = new Cart('cart-oop');    // here cart-oop is a parameter which is connected with constructor and constructor automatically run the setup code
const businessCart = new Cart('cart-business');
// now we dont have to capy paste the same code for 2 diff carts, there is a prop (new) which generates another cart with all the properties in code above
console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);  // instance - here we are checking if buisness card is generated from cart or not // op = true
