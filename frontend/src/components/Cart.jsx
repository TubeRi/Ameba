import React from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  return (
    <div className="cart-modal">
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-container">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <p className="empty-cart-hint">Add games to get started</p>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p className="cart-item-platform">{item.platform}</p>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove from cart"
                  >
                    ❌
                  </button>
                  <div className="cart-item-controls" style={{position: 'absolute', bottom: 18, left: 160, right: 24, width: 'calc(100% - 180px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end'}}>
                    <div className="quantity-control">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        −
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                    <p className="cart-item-price" style={{marginTop: 8, fontWeight: 700, fontSize: '1.25rem', color: '#ff5e7e'}}>
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>€{getCartTotal()}</span>
              </div>
              <div className="summary-row">
                <span>Items:</span>
                <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
              </div>
            </div>
            
            <div className="cart-actions">
              <button className="btn-clear" onClick={clearCart}>Clear Cart</button>
              <button className="btn-checkout">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
