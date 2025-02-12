//Function to save user in the database we're going to save his firstname and lastname, email
function saveUser(user) {
    console.log(`Saving user: ${user.firstName} ${user.lastName}, email: ${user.email}`);
    // Simulate saving to a database
    return true;
}

module.exports = { saveUser };