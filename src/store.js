class Store {
  constructor(initialState) {
    this.state = {
      ...initialState,
      cart: [], 
      totalPrice: 0,
      totalItems: 0, 
    };
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener());
  }

  addToCart(code) {
    const item = this.state.list.find(item => item.code === code);
    if (item) {
      const existingItem = this.state.cart.find(cartItem => cartItem.code === code);
      let newCart;

      if (existingItem) {
        newCart = this.state.cart.map(cartItem => 
          cartItem.code === code ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        newCart = [...this.state.cart, { ...item, quantity: 1 }];
      }

      const totalItems = newCart.length;
      const totalPrice = newCart.reduce((sum, cartItem) => sum + cartItem.price * cartItem.quantity, 0);

      this.state = { ...this.state, cart: newCart, totalItems, totalPrice };
      this.notify();
    }
  }

  removeFromCart(code) {
    const existingItem = this.state.cart.find(cartItem => cartItem.code === code);
    if (existingItem) {
      let newCart;
      if (existingItem.quantity > 1) {
        newCart = this.state.cart.map(cartItem => 
          cartItem.code === code ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );
      } else {
        newCart = this.state.cart.filter(cartItem => cartItem.code !== code);
      }

      const totalItems = newCart.length;
      const totalPrice = newCart.reduce((sum, cartItem) => sum + cartItem.price * cartItem.quantity, 0);

      this.state = { ...this.state, cart: newCart, totalItems, totalPrice };
      this.notify();
    }
  }
}

export default Store;
