import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Pages temporaires pour le test
const RegisterPage = () => <div data-testid="register-form">Register Page</div>
const ShopPage = () => <div data-testid="shop-page">Shop Page</div>
const CheckoutPage = () => <div data-testid="checkout-page">Checkout Page</div>

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  )
}
