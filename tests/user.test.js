//Testing save user to DB simulation

const User = require('../src/models/User'); // Ajoutez cette ligne
const { saveUser } = require('../src/user');

describe ('saveUser function', () => {
    test('should save a user to the database', () => {
        const user = new User('John', 'Doe', 'john@supinfo.com');
        const result = saveUser(user);
        expect(result).toBe(true);
    });
});
