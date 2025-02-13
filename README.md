# 4CITE

## Description
Ce projet est un exemple de test frontend et backend avec CI/CD et pipeline.

## Installation
1. Clonez le dépôt :
    ```bash
    git clone https://github.com/theagentmaro/4CITE.git
    cd 4CITE
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```

## Exécution des tests
Pour exécuter les tests, utilisez la commande suivante :
```bash
npm test
```

## Exemple de code
### Modèle d'utilisateur
```javascript
// filepath: /c:/Users/marwe/Desktop/M1Supinfo/4CITE/src/models/User.js
class User {
    constructor(firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

module.exports = User;
```

### Fonction pour enregistrer un utilisateur
```javascript
// filepath: /c:/Users/marwe/Desktop/M1Supinfo/4CITE/src/user.js
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
```

### Tests pour la fonction saveUser
```javascript
// filepath: /c:/Users/marwe/Desktop/M1Supinfo/4CITE/tests/user.test.js
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
```

## Simulated Database Module
```javascript
// filepath: /c:/Users/marwe/Desktop/M1Supinfo/4CITE/src/database.js
const database = {
    isEmailUsed: (email) => {
        // Simulate checking if email is used
        return false;
    },
    save: (user) => {
        // Simulate saving user to database
        console.log(`User ${user.firstName} ${user.lastName} saved to database.`);
        return true;
    }
};

module.exports = database;
```

## Exercices de test backend

### Exercice 10: Créer un endpoint REST basique
Créez un endpoint REST basique qui gère une requête simple et retourne un objet simple.

#### Code
```javascript
// filepath: /c:/Users/marwe/Desktop/M1Supinfo/4CITE/src/server.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/api/hello', (req, res) => {
    res.status(200).json({ message: 'Hello, world!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
```

#### Test
```javascript
// filepath: /c:/Users/marwe/Desktop/M1Supinfo/4CITE/tests/server.test.js
const request = require('supertest');
const app = require('../src/server');

describe('GET /api/hello', () => {
    it('should return a 200 status code and a message', async () => {
        const response = await request(app).get('/api/hello');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Hello, world!' });
        expect(response.headers['content-type']).toMatch(/json/);
    });
});
```

### Exercice 11: Endpoint pour enregistrer un utilisateur
Créez un endpoint qui permet d'enregistrer un utilisateur dans une base de données et testez deux cas d'utilisation.

#### Code
```javascript
// filepath: /c:/Users/marwe/Desktop/M1Supinfo/4CITE/src/server.js
// ...existing code...
const { saveUser } = require('./user');

app.post('/api/register', (req, res) => {
    const user = new User(req.body.firstName, req.body.lastName, req.body.email);
    try {
        saveUser(user);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
```

#### Test
```javascript
// filepath: /c:/Users/marwe/Desktop/M1Supinfo/4CITE/tests/server.test.js
// ...existing code...

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
```

### Exercice 12: Implémenter une solution de test plus complexe
Utilisez l'une de vos applications ou projets pour implémenter une solution de test plus complexe.

### Exercice 13: Utiliser proxyquire pour remplacer un import
Utilisez proxyquire pour remplacer complètement un import vers un autre module et surcharger une fonction basique.

#### Code
```javascript
// filepath: /c:/Users/marwe/Desktop/M1Supinfo/4CITE/src/user.js
const proxyquire = require('proxyquire');

const databaseStub = {
    isEmailUsed: (email) => false,
    save: (user) => true
};

const { saveUser } = proxyquire('./user', { './database': databaseStub });

module.exports = { saveUser };
```

#### Test
```javascript
// filepath: /c:/Users/marwe/Desktop/M1Supinfo/4CITE/tests/user.test.js
const proxyquire = require('proxyquire');
const User = require('../src/models/User');

const databaseStub = {
    isEmailUsed: jest.fn(),
    save: jest.fn()
};

const { saveUser } = proxyquire('../src/user', { '../src/database': databaseStub });

describe('saveUser function with proxyquire', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should save a user to the database with valid input fields', () => {
        const user = new User('John', 'Doe', 'john@supinfo.com');
        databaseStub.isEmailUsed.mockReturnValue(false);
        databaseStub.save.mockImplementation(() => true);

        const result = saveUser(user);
        expect(result).toBe(true);
    });
});
```
