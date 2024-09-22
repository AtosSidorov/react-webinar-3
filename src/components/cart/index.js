import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Cart({ cart, onRemoveFromCart, onClose }) {
  return (
    <div className="cart-container">
      <div className="Head">
        <h1>Корзина</h1>
        <button className="Button close-button" onClick={onClose}>Закрыть</button>
      </div>
      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map(item => (
            <div key={item.code} className={`cart-item ${item.type === 'type2' ? 'type2' : 'type1'}`}>
              <div className="cart-item-number">{item.code}</div>
              <div className="cart-item-title">
                {item.title}
                {item.type === 'type2' && item.description && (
                  <div className="cart-item-description">{item.description}</div>
                )}
              </div>
              {item.discount && (
                <div className="cart-item-discount">Скидка: {item.discount}%</div>
              )}
              {/* Цена товара */}
              <div className="cart-item-price">
                {item.discount ? (
                  <div>
                    <div className="original-price">
                      {Math.round(item.price)} ₽
                    </div>
                    <div className="discounted-price">
                      {Math.round(item.price - (item.price * (item.discount / 100)))} ₽
                    </div>
                  </div>
                ) : (
                  <div>{Math.round(item.price)} ₽</div>
                )}
              </div>
              <div className="cart-item-quantity">{item.quantity} шт</div>
              <div className="cart-item-button">
                <button className="Button" onClick={() => onRemoveFromCart(item.code)}>Удалить</button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-cart">Корзина пуста</div>
        )}
      </div>
      <div className="cart-total">
        <div className="cart-total-label">Итого:</div>
        <div>
          {Math.round(
            cart.reduce((sum, item) => {
              const discountedPrice = item.discount
                ? item.price - (item.price * (item.discount / 100))
                : item.price;
              return sum + discountedPrice * item.quantity;
            }, 0)
          )} ₽
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Cart;
