const request = require('supertest');
const app = require('../src/server');
const database = require('../src/database');

jest.mock('../src/database');

describe('GET /api/hello', () => {
    it('should return a 200 status code and a message', async () => {
        const response = await request(app).get('/api/hello');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Hello, world!' });
        expect(response.headers['content-type']).toMatch(/json/);
    });
});

describe('POST /api/register', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should register a user with valid input', async () => {
        const user = { firstName: 'John', lastName: 'Doe', email: 'john@supinfo.com' };
        database.isEmailUsed.mockReturnValue(false);
        database.save.mockImplementation(() => true);

        const response = await request(app).post('/api/register').send(user);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'User registered successfully' });
    });

    it('should return an error if the user already exists', async () => {
        const user = { firstName: 'John', lastName: 'Doe', email: 'john@supinfo.com' };
        database.isEmailUsed.mockReturnValue(true);

        const response = await request(app).post('/api/register').send(user);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Email already used' });
    });
});
