import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

test('affiche le contenu du bouton et appelle la fonction au clic', () => {
  const handleClick = jest.fn();
  const { getByText } = render(<Button onClick={handleClick}>Cliquez-moi</Button>);
  
  const buttonElement = getByText(/Cliquez-moi/i);
  expect(buttonElement).toBeInTheDocument();
  
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
