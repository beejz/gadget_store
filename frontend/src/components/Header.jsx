import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import adnuLogo from '../assets/adnu-smart-hub.png';
import { CartContext } from '../context/CartContext';

export default function Header() {
  const { cart } = useContext(CartContext);

  return (
    <header className="header">
      <div className="container">
        {/* Logo on the left */}
        <Link to="/" className="brand">
          <img src={adnuLogo} alt="Logo" className="logo" />
        </Link>

        {/* Centered title */}
        <Link to="/" className="site-title">
          ADNU SmartHub
        </Link>

        {/* Nav with Home and Cart badge on the right */}
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link">
            Cart
            {cart.length > 0 && (
              <span className="badge">{cart.length}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
