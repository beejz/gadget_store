import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api';

export default function CreateGadget() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    brand: '',
    price: '',
    description: ''
  });
  const [error, setError] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createProduct(form, /* token if required */);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('Failed to create gadget.');
    }
  };

  return (
    <main className="create-gadget">
      <h1>Add New Gadget</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
    </main>
  );
}
