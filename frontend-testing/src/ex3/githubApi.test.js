import { fetchGithubUser } from './githubApi';

// Mock de fetch global
global.fetch = jest.fn();

describe('fetchGithubUser', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should return user data on HTTP 200', async () => {
    const mockUser = { login: 'testuser', id: 1 };
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockUser),
      })
    );

    const result = await fetchGithubUser('testuser');
    expect(result).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith('https://api.github.com/users/testuser');
  });

  it('should throw Client Error on HTTP 4xx', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    await expect(fetchGithubUser('nonexistent')).rejects.toThrow('Client Error');
  });

  it('should throw Server Error on HTTP 5xx', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    await expect(fetchGithubUser('testuser')).rejects.toThrow('Server Error');
  });

  it('should throw error on network failure', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Network Error')));

    await expect(fetchGithubUser('testuser')).rejects.toThrow('Network Error');
  });
});
