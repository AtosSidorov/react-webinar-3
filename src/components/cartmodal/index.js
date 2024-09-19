import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function CartModal({ cart, onRemoveFromCart, onClose, list }) {
  const itemsInCart = Object.keys(cart).map(code => {
    const numericCode = parseInt(code, 10);
    const item = list.find(item => item.code === numericCode);
    return item ? { ...item, quantity: cart[code] } : null;
  }).filter(Boolean);

  const totalPrice = itemsInCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="modal-overlay">
      <div className="modal-cart">
        <div className="Head">
          <h1>Корзина</h1>
          <button onClick={onClose} className="Button" style={{ marginLeft: 'auto' }}>Закрыть</button>
        </div>
        <div className="Divider"></div>
        <div className="cart-items">
          {itemsInCart.length > 0 ? (
            itemsInCart.map(item => (
              <div key={item.code} className="List-item">
                <Item
                  item={item}
                  onAddToCart={() => onRemoveFromCart(item.code)} 
                  isInCart={true} 
                />
              </div>
            ))
          ) : (
            <div className="empty-cart">Корзина пуста</div>
          )}
        </div>
        <div className="cart-total">
          <span>Итого: {totalPrice.toFixed(2)} ₽</span>
        </div>
        <div className="Divider"></div>
      </div>
    </div>
  );
}

CartModal.propTypes = {
  cart: PropTypes.object.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
};

export default CartModal;
