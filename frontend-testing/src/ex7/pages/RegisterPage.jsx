import React, { useState } from 'react';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('user', JSON.stringify(formData));
    window.location.href = '/shop';
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} data-testid="register-form">
      <h2>Register</h2>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          data-testid="register-email"
          required
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          data-testid="register-password"
          required
        />
      </div>
      <div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          data-testid="register-confirm-password"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          data-testid="register-firstname"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          data-testid="register-lastname"
          required
        />
      </div>
      <button type="submit" data-testid="register-submit">Register</button>
    </form>
  );
};
