import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { Link } from 'react-router-dom'; 
import './style.css';

function BasketTotal({ sum, showBackLink }) { 
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      {showBackLink && (
        <Link to="/catalog" className={cn('back-link')}>Главная</Link>
      )}

      <div className={cn('info')}>
        <span className={cn('cell')}>Итого</span>
        <span className={cn('cell')}>{numberFormat(sum)} ₽</span>
      </div>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  showBackLink: PropTypes.bool, 
};

BasketTotal.defaultProps = {
  sum: 0,
  showBackLink: false, 
};

export default memo(BasketTotal);
