import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserForm } from './UserForm';

describe('UserForm', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    render(<UserForm onSubmit={mockSubmit} />);
    mockSubmit.mockClear();
  });

  it('should render all form fields', () => {
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('age-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('should show error for empty username', () => {
    fireEvent.click(screen.getByTestId('submit-button'));
    expect(screen.getByTestId('username-error')).toHaveTextContent('Username is required');
  });

  it('should show error for invalid email', () => {
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { name: 'email', value: 'invalid-email' } });
    
    // Soumettre le formulaire pour déclencher la validation
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    // Maintenant vérifier l'erreur
    expect(screen.getByTestId('email-error')).toHaveTextContent('Email is invalid');
  });

  it('should show error for invalid age', () => {
    const ageInput = screen.getByTestId('age-input');
    fireEvent.change(ageInput, { target: { value: '15' } });
    fireEvent.click(screen.getByTestId('submit-button'));
    expect(screen.getByTestId('age-error')).toHaveTextContent('Age must be at least 18');
  });

  it('should submit form with valid data', () => {
    // Remplir le formulaire avec des données valides
    fireEvent.change(screen.getByTestId('username-input'), { 
      target: { name: 'username', value: 'testuser' } 
    });
    fireEvent.change(screen.getByTestId('email-input'), { 
      target: { name: 'email', value: 'test@example.com' } 
    });
    fireEvent.change(screen.getByTestId('age-input'), { 
      target: { name: 'age', value: '25' } 
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    expect(mockSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@example.com',
      age: '25'
    });
  });
});
