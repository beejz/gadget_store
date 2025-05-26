import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const { cart } = useContext(CartContext);

  if (cart.length === 0) {
    return <p className="empty">Your cart is empty.</p>;
  }

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>
      <ul className="cart-list">
        {cart.map((item, idx) => (
          <li key={idx} className="cart-item">
            <img src={item.thumbnail} alt={item.title} />
            <div>
              <h2>{item.title}</h2>
              <p>${item.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
