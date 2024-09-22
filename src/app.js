import React, { useState, useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal'; 
import Cart from './components/cart';
import CartInfo from './components/cart-info';

function App({ store }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((code) => {
    store.addToCart(code);
  }, [store]);

  const removeFromCart = useCallback((code) => {
    store.removeFromCart(code);
  }, [store]);

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const { totalItems, totalPrice, cart, list } = store.getState(); 

  return (
    <PageLayout>
      <Head title="Магазин" />
      <CartInfo totalItems={totalItems} totalPrice={totalPrice} onCartClick={toggleCart} />
      <List list={list} onAddToCart={addToCart} /> 
      {isCartOpen && (
        <Modal onClose={toggleCart}>
          <Cart cart={cart} onRemoveFromCart={removeFromCart} onClose={toggleCart} />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
