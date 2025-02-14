import React, { useState, useEffect } from 'react';

export const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simuler un appel API de paiement
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.removeItem('cart');
    window.location.href = '/confirmation';
  };

  const handleChange = (e) => {
    setPaymentDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div data-testid="checkout-page">
      <h2>Checkout</h2>
      
      <div className="order-summary" data-testid="order-summary">
        <h3>Order Summary</h3>
        {cart.map((item, index) => (
          <div key={index} data-testid={`checkout-item-${item.id}`}>
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>
        ))}
        <div className="total" data-testid="checkout-total">
          Total: ${getTotalPrice()}
        </div>
      </div>

      <form onSubmit={handleSubmit} data-testid="payment-form">
        <div>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            data-testid="card-number"
            required
            pattern="[0-9]{16}"
          />
        </div>
        <div>
          <input
            type="text"
            name="expiryDate"
            placeholder="MM/YY"
            value={paymentDetails.expiryDate}
            onChange={handleChange}
            data-testid="expiry-date"
            required
            pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
          />
        </div>
        <div>
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={paymentDetails.cvv}
            onChange={handleChange}
            data-testid="cvv"
            required
            pattern="[0-9]{3,4}"
          />
        </div>
        <button type="submit" data-testid="submit-payment">
          Pay ${getTotalPrice()}
        </button>
      </form>
    </div>
  );
};
