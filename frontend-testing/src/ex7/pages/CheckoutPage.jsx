import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CheckoutPage.css';

export function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    const userData = localStorage.getItem('user');
    
    if (!cartData || !userData) {
      navigate('/shop');
      return;
    }

    setCart(JSON.parse(cartData));
  }, [navigate]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const validateCard = (number) => {
    const digits = number.replace(/\D/g, '');
    if (digits.length !== 16) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!paymentInfo.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!validateCard(paymentInfo.cardNumber)) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!paymentInfo.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else {
      const [month, year] = paymentInfo.expiryDate.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const now = new Date();
      if (expiry < now) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    if (!paymentInfo.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    if (!paymentInfo.name) {
      newErrors.name = 'Name is required';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
    }
    else if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 4)
        .replace(/(\d{2})(\d{2})/, '$1/$2');
    }
    else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setPaymentInfo(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setTimeout(() => {
        localStorage.removeItem('cart');
        navigate('/confirmation');
      }, 1000);
    } else {
      setErrors(newErrors);
    }
  };

  if (cart.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="checkout-container" data-testid="checkout-page">
      <div className="checkout-content">
        <div className="order-summary" data-testid="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cart.map(item => (
              <div key={item.cartId} className="order-item" data-testid={`checkout-item-${item.id}`}>
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total" data-testid="checkout-total">
            Total: ${calculateTotal()}
          </div>
        </div>

        <div className="payment-section">
          <h2>Payment Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name on Card</label>
              <input
                type="text"
                id="name"
                name="name"
                value={paymentInfo.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                data-testid="card-name"
                placeholder="John Doe"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className={errors.cardNumber ? 'error' : ''}
                data-testid="card-number"
              />
              {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className={errors.expiryDate ? 'error' : ''}
                  data-testid="expiry-date"
                />
                {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className={errors.cvv ? 'error' : ''}
                  data-testid="cvv"
                />
                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-payment"
              data-testid="submit-payment"
            >
              Pay ${calculateTotal()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
