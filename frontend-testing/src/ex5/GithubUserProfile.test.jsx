import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GithubUserProfile } from './GithubUserProfile';
import { fetchGithubUser } from '../ex3/githubApi';

// Mock the API module
jest.mock('../ex3/githubApi');

describe('GithubUserProfile', () => {
  const mockUser = {
    login: 'testuser',
    name: 'Test User',
    avatar_url: 'https://example.com/avatar.jpg',
    bio: 'Test bio',
    followers: 100,
    following: 50,
    public_repos: 30
  };

  beforeEach(() => {
    fetchGithubUser.mockClear();
  });

  it('should show loading state initially', () => {
    fetchGithubUser.mockImplementation(() => new Promise(() => {}));
    render(<GithubUserProfile username="testuser" />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should display user data when API call succeeds', async () => {
    fetchGithubUser.mockResolvedValue(mockUser);
    
    render(<GithubUserProfile username="testuser" />);
    
    await waitFor(() => {
      expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    });

    expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');
    expect(screen.getByTestId('user-bio')).toHaveTextContent('Test bio');
    expect(screen.getByTestId('user-avatar')).toHaveAttribute('src', mockUser.avatar_url);
    expect(screen.getByTestId('user-stats')).toHaveTextContent('Followers: 100');
  });

  it('should display error message when API call fails', async () => {
    fetchGithubUser.mockRejectedValue(new Error('User not found'));
    
    render(<GithubUserProfile username="nonexistent" />);
    
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByTestId('error')).toHaveTextContent('Error: User not found');
  });

  it('should handle missing optional user data', async () => {
    const userWithoutOptionalData = {
      ...mockUser,
      name: null,
      bio: null
    };
    
    fetchGithubUser.mockResolvedValue(userWithoutOptionalData);
    
    render(<GithubUserProfile username="testuser" />);
    
    await waitFor(() => {
      expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    });

    expect(screen.getByTestId('user-name')).toHaveTextContent('testuser');
    expect(screen.getByTestId('user-bio')).toHaveTextContent('No bio available');
  });
});
