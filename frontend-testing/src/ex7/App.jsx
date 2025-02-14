import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RegisterPage } from './pages/RegisterPage'
import { ShopPage } from './pages/ShopPage'
import { CheckoutPage } from './pages/CheckoutPage'

// Page de confirmation simple
const ConfirmationPage = () => (
  <div className="confirmation-page" style={{
    padding: '40px',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto'
  }}>
    <h1 style={{ color: '#4caf50', marginBottom: '20px' }}>
      Order Confirmed!
    </h1>
    <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
      Thank you for your purchase. Your order has been successfully processed.
    </p>
    <button
      onClick={() => window.location.href = '/shop'}
      style={{
        padding: '10px 20px',
        backgroundColor: '#4a90e2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
      }}
    >
      Continue Shopping
    </button>
  </div>
);

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </div>
  )
}
