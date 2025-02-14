import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { ShopPage } from './pages/ShopPage';
import { CheckoutPage } from './pages/CheckoutPage';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/" element={<Navigate to="/register" replace />} />
      </Routes>
    </Router>
  );
};
