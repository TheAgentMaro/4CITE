import React from 'react'; // Ajout de l'importation de React
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../components/LoginForm';

test('Le formulaire envoie bien l’email saisi', () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Se connecter'));

    expect(handleSubmit).toHaveBeenCalledWith('test@example.com');
});
