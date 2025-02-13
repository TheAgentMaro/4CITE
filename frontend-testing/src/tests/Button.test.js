import React from 'react'; // Ajout de l'importation de React
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ajout de l'importation
import Button from '../components/Button';

test('Le bouton affiche le bon texte', () => {
    render(<Button label="Clique moi" />);
    expect(screen.getByText('Clique moi')).toBeInTheDocument();
});

test('Le bouton déclenche bien un événement au clic', () => {
    const handleClick = jest.fn();
    render(<Button label="Clique moi" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Clique moi'));
    expect(handleClick).toHaveBeenCalledTimes(1);
});
