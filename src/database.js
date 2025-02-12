const users = [];

function isEmailUsed(email) {
    return users.some(user => user.email === email);
}

function save(user) {
    users.push(user);
}

module.exports = { isEmailUsed, save };