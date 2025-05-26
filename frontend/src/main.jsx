import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const root = createRoot(document.getElementById('root'));
 root.render(
   <React.StrictMode>
     <AuthProvider>
       <CartProvider>
         <App />
       </CartProvider>
     </AuthProvider>
   </React.StrictMode>
 );