// src/pages/AdminProducts.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      const all = await fetchProducts();
      setProducts(all);
    })();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await deleteProduct(id, token);
      setProducts(products.filter(p => p._id !== id));
    }
  };

  return (
    <main className="admin-products">
      <h1>Admin: Products</h1>
      <Link to="/admin/products/new" className="btn">+ Create New Product</Link>
      <table className="table">
        <thead>
          <tr><th>Name</th><th>Price</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>
                <Link to={`/admin/products/${p._id}/edit`} className="btn small">Edit</Link>
                <button onClick={() => handleDelete(p._id)} className="btn small danger">Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
