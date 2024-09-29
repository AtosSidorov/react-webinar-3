// src/app/product-detail/index.js
import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ProductInfo from '../../components/product-info';
import Controls from '../../components/controls';
import MainMenu from '../../components/main-menu'; 
import './style.css';

function ProductDetail() {
  const { id } = useParams();
  const store = useStore();

  const select = useSelector(state => ({
    product: state.product.product,
    loading: state.product.loading,
    error: state.product.error,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const addToBasket = useCallback(() => {
    if (select.product && select.product._id) {
      store.actions.basket.addToBasket(select.product._id);
    }
  }, [store.actions.basket, select.product]);

  useEffect(() => {
    store.actions.product.loadProduct(id); // Загружаем данные товара по ID
    return () => {
      store.actions.product.clearProduct(); // Очищаем данные при размонтировании компонента
    };
  }, [store.actions.product, id]);

  if (select.loading) return <div>Загрузка...</div>;
  if (select.error) return <div>Ошибка: {select.error}</div>;

  if (!select.product) return null;

  return (
    <PageLayout>
      <Head title={select.product.title} />

      {/* Контейнер для меню и корзины */}
      <div className="product-header">
        <MainMenu /> {/* Меню слева */}
        <BasketTool amount={select.amount} sum={select.sum} showButton={true} onOpen={() => store.actions.modals.open('basket')} /> {/* Корзина справа */}
      </div>

      <ProductInfo
        title={select.product.title}
        description={select.product.description}
        madeIn={select.product.madeIn}
        category={select.product.category}
        releaseYear={select.product.releaseYear}
        price={select.product.price}
        onAddToBasket={addToBasket}
      />
      <Controls onAdd={addToBasket} />
    </PageLayout>
  );
}

export default ProductDetail;
