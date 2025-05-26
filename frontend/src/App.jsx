import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import AdminGadgets from './pages/AdminGadgets';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/admin" element={<AdminGadgets />} />
        <Route path="/gadgets/:id/edit" element={<EditProduct />} />
        <Route path="*" element={<div>404: Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
