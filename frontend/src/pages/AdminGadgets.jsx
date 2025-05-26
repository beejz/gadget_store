// frontend/src/pages/AdminGadgets.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../services/api';
import { toast } from 'react-toastify';

export default function AdminGadgets() {
  const [gadgets, setGadgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  const loadGadgets = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchProducts();
      setGadgets(data);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Failed to load gadgets.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGadgets();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Delete this gadget?')) return;
    setDeletingId(id);
    setError(null);
    try {
      await deleteProduct(id);
      toast.success('Gadget deleted successfully!');
      await loadGadgets();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Delete failed.';
      setError(msg);
      toast.error(msg);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p style={{ padding: '2rem' }}>Loading gadgets…</p>;
  }
  if (error) {
    return <p style={{ color: 'red', padding: '2rem' }}>{error}</p>;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Admin: Manage Gadgets</h1>
      <Link to="/create">
        <button style={{ margin: '1rem 0' }}>+ Add New Gadget</button>
      </Link>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Name</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Brand</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Model</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem', textAlign: 'right' }}>Price</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem', textAlign: 'right' }}>Stock</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gadgets.map(g => (
            <tr key={g._id}>
              <td style={{ padding: '0.5rem' }}>{g.name}</td>
              <td>{g.brand}</td>
              <td>{g.model || '-'}</td>
              <td style={{ textAlign: 'right' }}>₱{g.price}</td>
              <td style={{ textAlign: 'right' }}>{g.countInStock}</td>
              <td style={{ textAlign: 'center' }}>
                <Link to={`/gadgets/${g._id}/edit`}>
                  <button style={{ marginRight: '0.5rem' }}>Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(g._id)}
                  disabled={deletingId === g._id}
                >
                  {deletingId === g._id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
