import React, { useState, useCallback } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cartmodal'; 
import CartInfo from './components/cart-info';

function App({ store }) {
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((code) => {
    setCart((prevCart) => {
      const item = store.getState().list.find(item => item.code === code);
      if (item) {
        return {
          ...prevCart,
          [code]: (prevCart[code] || 0) + 1
        };
      }
      return prevCart;
    });
  }, [store]);

  const removeFromCart = useCallback((code) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[code];
      return newCart;
    });
  }, []);

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  // Подсчет уникальных товаров и общей суммы
  const totalUniqueItems = Object.keys(cart).length;
  const totalPrice = Object.keys(cart).reduce((sum, code) => {
    const item = store.getState().list.find(item => item.code === parseInt(code, 10)); 
    if (item) {
      return sum + (item.price * cart[code]);
    }
    return sum;
  }, 0);

  const list = store.getState().list;

  const callbacks = {
    onAddToCart: addToCart
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <CartInfo totalItems={totalUniqueItems} totalPrice={totalPrice} onCartClick={toggleCart} />
      <List list={list} onAddToCart={callbacks.onAddToCart} />
      {isCartOpen && <CartModal cart={cart} onRemoveFromCart={removeFromCart} onClose={toggleCart} list={list} />}
    </PageLayout>
  );
}

export default App;
