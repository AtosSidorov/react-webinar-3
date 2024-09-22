import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import './style.css';

const store = new Store({
  list: [
    { code: 1, title: 'Название товара', price: 100.0, type: 'type1' },
    { code: 2, title: 'Книга про React', price: 770, type: 'type1' },
    { code: 3, title: 'Конфета', price: 33, type: 'type1' },
    { code: 4, title: 'Трактор', price: 7955320, type: 'type2', description: 'Акция на трактор!', discount: 15 },
    { code: 5, title: 'Телефон iPhone XIXV', price: 120000, type: 'type1' },
    { code: 6, title: 'Карандаши цветные', price: 111, type: 'type1' },
    { code: 7, title: 'Товар сюрприз', price: 0, type: 'type2', description: 'Бесплатно!' },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
