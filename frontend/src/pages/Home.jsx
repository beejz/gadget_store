import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import './Home.css';

export default function Home() {
  const [gadgets, setGadgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        // Fetch all gadgets
        const allGadgets = await fetchProducts();
        setGadgets(allGadgets);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load gadgets.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p className="loading">Loading gadgets…</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <main className="home">
      <h1>All Gadgets</h1>
      <div className="grid">
        {gadgets.length > 0 ? (
          gadgets.map(gadget => (
            <div key={gadget._id} className="product-wrapper">
              <ProductCard product={gadget} />
              <button
                onClick={() => addToCart(gadget)}
                className="btn add-cart"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No gadgets available.</p>
        )}
      </div>
    </main>
  );
}