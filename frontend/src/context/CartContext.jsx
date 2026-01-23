import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

const STORAGE_KEY = "ameba_cart_v1";

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const CartProvider = ({ children }) => {
  // ✅ load from localStorage on first render
  const [cart, setCart] = useState(loadCart);

  // ✅ save to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage errors (private mode/quota)
    }
  }, [cart]);

  const addToCart = (game) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === game.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...game, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (gameId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== gameId));
  };

  const updateQuantity = (gameId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(gameId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === gameId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]); // effect will also overwrite localStorage with []
  };

  const getCartTotal = () => {
    return cart
      .reduce((total, item) => total + Number(item.price || 0) * Number(item.quantity || 0), 0)
      .toFixed(2);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + Number(item.quantity || 0), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
