import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RegisterPage } from './pages/RegisterPage'

// Pages temporaires pour le test
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
