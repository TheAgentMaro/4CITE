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
