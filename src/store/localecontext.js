// src/store/localecontext.js
import React, { createContext, useState, useContext } from 'react';

// Объект с переводами для каждого языка
const translations = {
    en: {
      title: 'Store',
      addToCart: 'Add',
      cart: 'In Cart',
      goToCart: 'Go to Cart',
      pageTitle: 'Page',
      previous: 'Previous',
      next: 'Next',
      back: 'Back',
      items: 'pcs', 
      remove: 'Remove',
    },
    ru: {
      title: 'Магазин',
      addToCart: 'Добавить',
      cart: 'В корзине',
      goToCart: 'Перейти',
      pageTitle: 'Страница',
      previous: 'Предыдущая',
      next: 'Следующая',
      back: 'Назад',
      items: 'шт', 
      remove: 'Удалить', 
    }
  };

// Создаем контекст для языка и переводов
const LocaleContext = createContext();

// Провайдер контекста для управления языком
export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState('ru'); // По умолчанию язык - русский

  // Функция для переключения языка
  const switchLanguage = (language) => {
    setLocale(language);
  };

  return (
    <LocaleContext.Provider value={{ locale, translations: translations[locale], switchLanguage }}>
      {children}
    </LocaleContext.Provider>
  );
};

// Хук для использования контекста языка
export const useLocale = () => useContext(LocaleContext);
