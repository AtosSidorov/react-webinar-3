import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function CartInfo({ totalItems, totalPrice, onCartClick }) {
  return (
    <div className="CartInfo">
      <span className="CartInfo-text">
        В корзине: {totalItems > 0 ? (
          <strong>{totalItems} {plural(totalItems, { one: 'товар', few: 'товара', many: 'товаров' })} / {totalPrice.toFixed(2)} ₽</strong>
        ) : (
          <strong>пусто</strong>
        )}
      </span>
      <button className="Button" onClick={onCartClick}>Перейти</button>
    </div>
  );
}

CartInfo.propTypes = {
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onCartClick: PropTypes.func.isRequired,
};

export default CartInfo;
