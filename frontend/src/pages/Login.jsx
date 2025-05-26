// frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async e => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/admin/products');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <h2>Login</h2>
      <label>Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} required />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
}
