// src/pages/EditProduct.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function EditProduct() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchProductById(id);
      setForm({
        name: data.name,
        brand: data.brand,
        model: data.model,
        price: data.price,
        countInStock: data.countInStock
      });
    })();
  }, [id]);

  if (!form) return <p>Loading…</p>;

  const submitHandler = async e => {
    e.preventDefault();
    await updateProduct(id, form, token);
    navigate('/admin/products');
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <h2>Edit Product</h2>
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
      <button type="submit" className="btn">Update</button>
    </form>
  );
}
