import React, { useState, useEffect } from 'react';

const products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 },
];

export const ShopPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    window.location.href = '/checkout';
  };

  return (
    <div data-testid="shop-page">
      <h2>Shop</h2>
      <div className="products" data-testid="products-list">
        {products.map(product => (
          <div key={product.id} className="product" data-testid={`product-${product.id}`}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              data-testid={`add-to-cart-${product.id}`}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart" data-testid="cart">
        <h3>Cart</h3>
        {cart.map((item, index) => (
          <div key={index} data-testid={`cart-item-${item.id}`}>
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>
        ))}
        <div className="total" data-testid="cart-total">
          Total: ${getTotalPrice()}
        </div>
        <button
          onClick={handleCheckout}
          data-testid="checkout-button"
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
