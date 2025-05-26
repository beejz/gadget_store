import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(form);        // calls registerUser + stores token/user
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering…' : 'Register'}
        </button>
      </form>
    </main>
  );
}
