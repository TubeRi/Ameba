import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (game) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === game.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...game, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (gameId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== gameId));
  };

  const updateQuantity = (gameId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(gameId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === gameId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
