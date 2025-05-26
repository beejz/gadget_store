import React, { createContext, useState, useContext } from 'react';
import { toPHP } from '../utils/currency';

// Create cart context
const CartContext = createContext();

/**
 * Provider component to wrap the app and supply cart state & actions
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  /**
   * Add a product to the cart, converting its USD price to PHP
   */
  const addToCart = (product) => {
    const pricePHP = toPHP(product.price);
    setCart(prev => [
      ...prev,
      { ...product, originalPrice: product.price, pricePHP }
    ]);
  };

  /**
   * Remove an item from the cart by its ID
   */
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  /**
   * Clear all items from the cart
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * Calculate the total price in PHP
   */
  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.pricePHP, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook to access cart context
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}

export default CartContext;