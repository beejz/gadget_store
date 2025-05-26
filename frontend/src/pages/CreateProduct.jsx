// src/pages/CreateProduct.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CreateProduct() {
  const [form, setForm] = useState({ name: '', price: 0, brand: '', model: '', countInStock: 0 });
  const { token } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async e => {
    e.preventDefault();
    await createProduct(form, token);
    navigate('/admin/products');
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <h2>Create Product</h2>
      <label>Name</label>
      <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
      <label>Brand</label>
      <input value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} />
      <label>Model</label>
      <input value={form.model} onChange={e => setForm({...form, model: e.target.value})} />
      <label>Price</label>
      <input
        type="number"
        value={form.price}
        onChange={e => setForm({...form, price: Number(e.target.value)})}
        required
      />
      <label>Count in Stock</label>
      <input
        type="number"
        value={form.countInStock}
        onChange={e => setForm({...form, countInStock: Number(e.target.value)})}
      />
      <button type="submit" className="btn">Save</button>
    </form>
  );
}
