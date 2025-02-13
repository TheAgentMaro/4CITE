const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
const { saveUser } = require('./user');
const User = require('./models/User');

app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.status(200).json({ message: 'Hello, world!' });
});

app.post('/api/register', (req, res) => {
    const user = new User(req.body.firstName, req.body.lastName, req.body.email);
    try {
        saveUser(user);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
