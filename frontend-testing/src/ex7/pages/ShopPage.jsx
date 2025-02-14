import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ShopPage.css';

// Produits de démonstration
const PRODUCTS = [
  { id: 1, name: 'Basic T-Shirt', price: 10, image: 'https://via.placeholder.com/150?text=T-Shirt' },
  { id: 2, name: 'Premium Jeans', price: 20, image: 'https://via.placeholder.com/150?text=Jeans' },
  { id: 3, name: 'Casual Shoes', price: 30, image: 'https://via.placeholder.com/150?text=Shoes' },
  { id: 4, name: 'Classic Watch', price: 40, image: 'https://via.placeholder.com/150?text=Watch' }
];

export function ShopPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/register');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem.quantity === 1) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    // Sauvegarder le panier dans le localStorage pour la page de paiement
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/checkout');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shop-container" data-testid="shop-page">
      <header className="shop-header">
        <h1>Welcome to our Shop, {user.firstName}!</h1>
        <div className="user-info">
          <span>{user.email}</span>
        </div>
      </header>

      <main className="shop-content">
        <section className="products-section">
          <h2>Our Products</h2>
          <div className="products-grid">
            {PRODUCTS.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  data-testid={`add-to-cart-${product.id}`}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        <aside className="cart-section" data-testid="cart">
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <ul className="cart-items">
                {cart.map(item => (
                  <li key={item.id} data-testid={`cart-item-${item.id}`} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>${item.price} x {item.quantity}</p>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => removeFromCart(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-summary">
                <div className="cart-total" data-testid="cart-total">
                  Total: ${calculateTotal()}
                </div>
                <button
                  className="checkout-button"
                  onClick={handleCheckout}
                  data-testid="checkout-button"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </aside>
      </main>
    </div>
  );
}
