// src/pages/EditProduct.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function EditProduct() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    brand: '',
    model: '',
    description: '',
    price: 0,
    countInStock: 0
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProductById(id);
        setForm({
          name: data.name || '',
          brand: data.brand || '',
          model: data.model || '',
          description: data.description || '',
          price: data.price || 0,
          countInStock: data.countInStock || 0
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load product.');
        toast.error('Failed to load product.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleChange = e => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const submitHandler = async e => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await updateProduct(id, form);
      toast.success('Gadget updated successfully!');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.message || 'Update failed.';
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading product…</p>;
  if (error && !saving) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <main style={{ padding: '2rem' }}>
      <h2>Edit Product</h2>
      <form onSubmit={submitHandler} style={{ display: 'grid', gap: '1rem' }}>
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Brand</label>
        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
        />

        <label>Model</label>
        <input
          name="model"
          value={form.model}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <label>Price</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />

        <label>Count in Stock</label>
        <input
          name="countInStock"
          type="number"
          value={form.countInStock}
          onChange={handleChange}
        />

        <button type="submit" className="btn" disabled={saving}>
          {saving ? 'Updating...' : 'Update'}
        </button>
      </form>
    </main>
  );
}