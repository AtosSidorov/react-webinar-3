import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useStore from '../../store/use-store'; 
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const store = useStore(); 

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    onLinkClick: () => {
      store.actions.modals.close(); 
    },
  };

  return (
    <div className={cn()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link 
        to={`/product/${props.item._id}`} 
        className={cn('link')} 
        onClick={callbacks.onLinkClick} 
        style={{ flexGrow: 1, textDecoration: 'none' }} 
      >
        <div className={cn('title')}>{props.item.title}</div>
      </Link>
      <div className={cn('right')} style={{ display: 'flex', alignItems: 'center' }}>
        <div className={cn('cell')} style={{ paddingRight: '10px' }}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')} style={{ paddingRight: '10px' }}>
          {numberFormat(props.item.amount || 0)} шт
        </div>
        <div className={cn('cell')} style={{ paddingRight: '10px' }}>
          <button onClick={callbacks.onRemove} style={{ marginLeft: '10px' }}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
