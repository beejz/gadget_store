import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  // Use converted PHP price if available, else fallback to USD raw price
  const amount = product.pricePHP ?? product.price;
  const priceDisplay = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(amount);

  return (
    <Link to={`/product/${product.id}`} className="card">
      <img src={product.thumbnail} alt={product.title} className="card-img" />
      <h3 className="card-title">{product.title}</h3>
      <p className="card-price">{priceDisplay}</p>
    </Link>
  );
}
