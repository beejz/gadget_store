// frontend/src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async e => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigate('/admin/products');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <h2>Register</h2>
      <label>Name</label>
      <input value={name} onChange={e => setName(e.target.value)} required />
      <label>Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} required />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}
