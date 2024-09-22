import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ListItemType2({ item, onAddToCart }) {
  return (
    <div className="list-item-type2">
      <div className="item-number">{item.code}</div>
      <div className="item-title">
        {item.title}
        {item.description && (
          <div className="item-description">{item.description}</div>
        )}
      </div>
      {item.discount && <div className="item-discount">Скидка: {item.discount}%</div>}
      {item.promotion && <div className="item-promotion">{item.promotion}</div>}
      <div className="item-price">{Math.round(item.price)} ₽</div>
      <div className="item-button-container">
        <button className="Button" onClick={() => onAddToCart(item.code)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

ListItemType2.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    discount: PropTypes.number, 
    promotion: PropTypes.string, 
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ListItemType2;
