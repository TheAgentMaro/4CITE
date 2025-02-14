const User = require('./models/User');
const database = require('./database'); // Simulated database module

function saveUser(user) {
    if (!user.firstName || !user.lastName || !user.email) {
        throw new Error('Invalid input fields');
    }

    if (database.isEmailUsed(user.email)) {
        throw new Error('Email already used');
    }

    try {
        database.save(user);
        return true;
    } catch (error) {
        throw new Error('Database error');
    }
}

module.exports = { saveUser };