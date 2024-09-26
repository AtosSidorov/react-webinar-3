import { useCallback, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './main';
import Basket from './basket';
import ProductDetail from '../components/product-detail'; // Импорт страницы товара
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <Router>
      <>
        {/* Основная логика маршрутизации */}
        <Routes>
          <Route path="/catalog" element={<Main />} /> {/* Маршрут для главной страницы с каталогом */}
          <Route path="/product/:id" element={<ProductDetail />} /> {/* Маршрут для страницы товара */}
          <Route path="/" element={<Main />} /> {/* Корневой маршрут */}
        </Routes>
        
        {/* Модалка корзины */}
        {activeModal === 'basket' && <Basket />}
      </>
    </Router>
  );
}

export default App;
