import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Header         from "./components/Header";
import Home           from "./pages/Home";
import Product        from "./pages/Product";
import Cart           from "./pages/Cart";
import Login          from "./pages/Login";
import Register       from "./pages/Register";
import AdminProducts  from "./pages/AdminProducts";
import CreateProduct  from "./pages/CreateProduct";
import EditProduct    from "./pages/EditProduct";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/"          element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart"      element={<Cart />} />

          {/* Admin Routes */}
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/new"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/:id/edit"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <div style={{ padding: "2rem", textAlign: "center" }}>
                🚧 404: Page not found
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
