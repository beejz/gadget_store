// src/pages/Product.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchProductById,
  fetchUSDtoPHP
} from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Product.css';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [rate, setRate] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Failed to load product:', err);
        setError('Product not found');
        setLoading(false);
        return;
      }

      try {
        const phpRate = await fetchUSDtoPHP();
        setRate(phpRate || 1);
      } catch (err) {
        console.error('Failed to load exchange rate:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) return <p className="loading">Loading…</p>;
  if (error) return <p className="error">{error}</p>;

  const pricePHP = product.price * rate;
  const formattedPHP = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(pricePHP);

  const handleAdd = () => {
    addToCart({
      ...product,
      pricePHP,
      originalPrice: product.price
    });
  };

  const handleBuy = () => {
    handleAdd();
    navigate('/checkout');
  };

  return (
    <article className="detail">
      <img
        src={product.image}
        alt={product.name}
        className="detail-img"
      />
      <div className="detail-info">
        <h2 className="detail-title">{product.name}</h2>
        <p className="detail-price">{formattedPHP}</p>
        <p className="detail-desc">{product.description}</p>
        <div className="actions">
          <button className="btn" onClick={handleAdd}>
            Add to Cart
          </button>
          <button className="btn buy" onClick={handleBuy}>
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}