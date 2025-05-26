// src/pages/EditGadget.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditGadget() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    axios.get(`/api/gadgets/${id}`)
      .then(res => {
        setName(res.data.name);
        setPrice(res.data.price);
      })
      .catch(console.error);
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // <-- YOUR UPDATE CALL
      await axios.put(`/api/gadgets/${id}`, { name, price });
      navigate('/admin');               // redirect back to listing
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={price} onChange={e => setPrice(e.target.value)} />
      <button type="submit">Save Changes</button>
    </form>
  );
}
