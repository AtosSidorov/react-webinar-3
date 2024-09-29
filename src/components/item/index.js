import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { Link } from 'react-router-dom'; 
import './style.css';

function Item(props) {
  const cn = bem('Item');
  
  const callbacks = {
    onAdd: e => props.onAdd(props.item._id),
  };

  // Логика для использования динамической ссылки
  const itemLink = props.itemLink ? props.itemLink : `/product/${props.item._id}`;

  return (
    <div className={cn()}>
      <Link to={itemLink} className={cn('link')}>
        <div className={cn('title')}>{props.item.title}</div>
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  itemLink: PropTypes.string, // Новый проп для ссылки на страницу товара
};

Item.defaultProps = {
  onAdd: () => {},
  itemLink: '', // По умолчанию ссылки нет, будет использоваться стандартный путь
};

export default memo(Item);
