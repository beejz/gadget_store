import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Home.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Fetch all products then filter to only Apple brand
        const allProducts = await fetchProducts();
        const appleOnly = allProducts.filter(
          p => p.brand.toLowerCase() === 'apple'
        );
        setProducts(appleOnly);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p className="loading">Loading products…</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <main className="home">
      <h1>Latest Apple Gadgets</h1>
      <div className="grid">
        {products.length > 0 ? (
          products.map(p => <ProductCard key={p._id} product={p} />)
        ) : (
          <p>No Apple products found.</p>
        )}
      </div>
    </main>
  );
}
