// Service pour faire des appels à l'API GitHub
export const fetchGithubUser = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        throw new Error('Client Error');
      }
      if (response.status >= 500) {
        throw new Error('Server Error');
      }
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};
