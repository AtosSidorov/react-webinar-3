import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAddToCart, isInCart }) {
  return (
    <div className="Item">
      <div className="Item-title">
        {item.title}
      </div>
      {isInCart && (
        <div className="Item-quantity">
          {item.quantity} шт.
        </div>
      )}
      <div className="Item-price">
        {item.price} ₽
      </div>
      <button className="Button" onClick={() => onAddToCart(item.code)}>
        {isInCart ? 'Удалить' : 'Добавить'}
      </button>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number, // Опционально, если товар в корзине
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  isInCart: PropTypes.bool, // Признак того, что товар находится в корзине
};

export default Item;
