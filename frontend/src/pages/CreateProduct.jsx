// src/pages/CreateProduct.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: '',
    price: 0,
    brand: '',
    model: '',
    countInStock: 0,
    description: ''
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async e => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createProduct(form);
      toast.success('Gadget created successfully!');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || err.message || 'Failed to create product';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h2>Create Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={submitHandler} className="form">
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
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <label>Count in Stock</label>
        <input
          type="number"
          name="countInStock"
          value={form.countInStock}
          onChange={handleChange}
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </main>
  );
}
