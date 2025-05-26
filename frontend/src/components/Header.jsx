import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import adnuLogo from '../assets/adnu-smart-hub.png';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

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

        {/* Nav with Home, conditional links, and Cart badge on the right */}
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          {user && <Link to="/create" className="nav-link">Add Gadget</Link>}
          {user && <Link to="/admin" className="nav-link">Admin</Link>}
          <Link to="/cart" className="nav-link">
            Cart
            {cart.length > 0 && (
              <span className="badge">{cart.length}</span>
            )}
          </Link>
          {user ? (
            <>
              <span className="welcome">Hi, {user.name}</span>
              <button onClick={logout} className="nav-link logout">Logout</button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
