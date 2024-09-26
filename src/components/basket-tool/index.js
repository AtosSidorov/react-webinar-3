import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import { Link } from 'react-router-dom'; 
import './style.css';

function BasketTool({ sum, amount, onOpen, showButton, showBackLink }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div className={cn('left')}>
        {showBackLink && ( // Условный рендеринг ссылки "Главная"
          <Link to="/catalog" className={cn('back-link')}>Главная</Link>
        )}
      </div>
      <div className={cn('right')}>
        <span className={cn('label')}>В корзине:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${numberFormat(sum)} ₽`
            : `пусто`}
        </span>
        {showButton && ( 
          <button onClick={onOpen}>Перейти</button>
        )}
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  showButton: PropTypes.bool,
  showBackLink: PropTypes.bool,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  showButton: true,
  showBackLink: false,
};

export default memo(BasketTool);
