//Testing save user to DB simulation

const User = require('../src/models/User');
const { saveUser } = require('../src/user');
const database = require('../src/database');

jest.mock('../src/database');

describe('saveUser function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should save a user to the database with valid input fields', () => {
        const user = new User('John', 'Doe', 'john@supinfo.com');
        database.isEmailUsed.mockReturnValue(false);
        database.save.mockImplementation(() => true);

        const result = saveUser(user);
        expect(result).toBe(true);
    });

    test('should throw an error if input fields are invalid', () => {
        const user = new User('', 'Doe', 'john@supinfo.com');

        expect(() => saveUser(user)).toThrow('Invalid input fields');
    });

    test('should throw an error if email is already used', () => {
        const user = new User('John', 'Doe', 'john@supinfo.com');
        database.isEmailUsed.mockReturnValue(true);

        expect(() => saveUser(user)).toThrow('Email already used');
    });

    test('should throw an error if database is down', () => {
        const user = new User('John', 'Doe', 'john@supinfo.com');
        database.isEmailUsed.mockReturnValue(false);
        database.save.mockImplementation(() => {
            throw new Error('Database error');
        });

        expect(() => saveUser(user)).toThrow('Database error');
    });

    test('should handle network lag or down', () => {
        const user = new User('John', 'Doe', 'john@supinfo.com');
        database.isEmailUsed.mockReturnValue(false);
        database.save.mockImplementation(() => {
            throw new Error('Database error');
        });

        expect(() => saveUser(user)).toThrow('Database error');
    });
});
