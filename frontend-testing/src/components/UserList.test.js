import React from 'react';
import { render } from '@testing-library/react';
import UserList from './UserList';

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

test('affiche une liste d\'utilisateurs', () => {
  const { getByText } = render(<UserList users={users} />);
  
  users.forEach(user => {
    expect(getByText(user.name)).toBeInTheDocument();
    expect(getByText(user.email)).toBeInTheDocument();
  });
});
