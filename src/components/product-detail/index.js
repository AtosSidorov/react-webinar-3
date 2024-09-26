import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head'; 
import BasketTool from '../../components/basket-tool';
import './style.css';

function ProductDetail() {
  const { id } = useParams(); 
  const store = useStore();
  const [product, setProduct] = useState(null);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const openModalBasket = useCallback(() => store.actions.modals.open('basket'), [store]);

  const addToBasket = useCallback(() => {
    if (product && product._id && product.price) {
      store.actions.basket.addToBasket(product._id); 
      console.log(`Товар добавлен в корзину: ${product._id}, Цена: ${product.price}`);
    } else {
      console.error('Ошибка: Товар не загружен или отсутствуют ID или цена.');
    }
  }, [store.actions.basket, product]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
        const json = await response.json();
        if (json && json.result) {
          console.log('Товар загружен:', json.result);
          setProduct(json.result);
        } else {
          console.error('Ошибка: Товар не найден или неверный формат данных.');
        }
      } catch (error) {
        console.error('Ошибка загрузки товара:', error);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Загрузка...</div>;
  }

  return (
    <PageLayout>
      <Head title={product.title} /> 

      <BasketTool 
        onOpen={openModalBasket} 
        amount={select.amount} 
        sum={select.sum} 
        showButton={false} 
        showBackLink={true} 
      />

      <div className="product-content">
        <p>{product.description}</p>
        <p className="made-in">
          Страна производитель: <strong>{product.madeIn?.title || 'Нет данных'}</strong> ({product.madeIn?.code})
        </p>
        <p className="category">Категория: <strong>{product.category?.title || 'Нет данных'}</strong></p>
        <div className="meta">
          <p>Год выпуска: <strong>{product.releaseYear || 'Нет данных'}</strong></p>
        </div>
        <div className="price">
          Цена: {product.price} ₽
        </div>
        <div className="actions">
          <button 
            onClick={addToBasket} 
            disabled={!product || !product._id || !product.price} // Проверка на наличие ID и цены
          >
            Добавить
          </button>
        </div>
      </div>
    </PageLayout>
  );
}

export default ProductDetail;
