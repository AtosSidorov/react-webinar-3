import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ListItemType1({ item, onAddToCart }) {
  return (
    <div className="list-item-type1">
      <div className="item-number">{item.code}</div> 
      <div className="item-title">{item.title}</div>
      <div className="item-price">{Math.round(item.price)} ₽</div>
      <div className="item-button-container"> 
        <button className="Button" onClick={() => onAddToCart(item.code)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

ListItemType1.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ListItemType1;
