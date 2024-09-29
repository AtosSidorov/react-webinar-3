import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ProductInfo({ title, description, madeIn, category, releaseYear, price, onAddToBasket }) {
    return (
      <div className="product-info">
        <p>{description}</p>
        <p className="made-in">
          Страна производитель: <strong>{madeIn?.title || 'Нет данных'}</strong> ({madeIn?.code})
        </p>
        <p className="category">Категория: <strong>{category?.title || 'Нет данных'}</strong></p>
        <p className="meta">
          Год выпуска: <strong>{releaseYear || 'Нет данных'}</strong>
        </p>
        <p className="price">
          Цена: {price} ₽
        </p>
      </div>
    );
  }

  
ProductInfo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  madeIn: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
  }),
  category: PropTypes.shape({
    title: PropTypes.string,
  }),
  releaseYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.number,
  onAddToBasket: PropTypes.func.isRequired,
};

ProductInfo.defaultProps = {
  madeIn: {},
  category: {},
  releaseYear: 'Нет данных',
  price: 0,
};

export default React.memo(ProductInfo);
