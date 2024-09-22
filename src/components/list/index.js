import React from 'react';
import PropTypes from 'prop-types';
import ListItemType1 from '../list-item-type1';
import ListItemType2 from '../list-item-type2';
import './style.css';

function List({ list, onAddToCart }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          {/* Выбираем компонент в зависимости от типа товара */}
          {item.type === 'type1' ? (
            <ListItemType1 item={item} onAddToCart={onAddToCart} />
          ) : item.type === 'type2' ? (
            <ListItemType2 item={item} onAddToCart={onAddToCart} />
          ) : null}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired, // Обязательно указываем тип
    }),
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default React.memo(List);
