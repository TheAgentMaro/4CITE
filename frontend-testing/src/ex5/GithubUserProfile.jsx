import React, { useState, useEffect } from 'react';
import { fetchGithubUser } from '../ex3/githubApi';

export const GithubUserProfile = ({ username }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await fetchGithubUser(username);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      loadUser();
    }
  }, [username]);

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (error) {
    return <div data-testid="error">Error: {error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div data-testid="user-profile">
      <img 
        src={user.avatar_url} 
        alt={`${username}'s avatar`}
        data-testid="user-avatar"
      />
      <h2 data-testid="user-name">{user.name || username}</h2>
      <p data-testid="user-bio">{user.bio || 'No bio available'}</p>
      <div data-testid="user-stats">
        <p>Followers: {user.followers}</p>
        <p>Following: {user.following}</p>
        <p>Public Repos: {user.public_repos}</p>
      </div>
    </div>
  );
};
