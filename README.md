# 4CITE - Test Frontend/Backend & CI/CD

## Description
Ce projet démontre l'implémentation de tests frontend et backend avec une intégration continue (CI) et un déploiement continu (CD) automatisé. Il sert d'exemple pour les bonnes pratiques de test et d'automatisation dans le développement moderne.

## Technologies Utilisées
- **Frontend**: React.js avec Jest et React Testing Library
- **Backend**: Node.js/Express avec Jest
- **Base de données**: MongoDB
- **CI/CD**: GitHub Actions
- **Tests E2E**: Cypress

## Prérequis
- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)
- MongoDB (v4.4 ou supérieur)

## Installation
1. Clonez le dépôt :
    ```bash
    git clone https://github.com/theagentmaro/4CITE.git
    cd 4CITE
    ```

2. Installez les dépendances :
    ```bash
    # Installation des dépendances backend
    npm install
    
    # Installation des dépendances frontend
    cd client
    npm install
    ```

3. Configurez les variables d'environnement :
    ```bash
    cp .env.example .env
    # Modifiez les variables dans .env selon votre configuration
    ```

## Tests

### Tests Unitaires Backend
```bash
# Exécuter tous les tests backend
npm test

# Exécuter les tests avec couverture
npm run test:coverage

# Exécuter les tests en mode watch
npm run test:watch
```

### Tests Frontend
```bash
# Dans le dossier client
cd client

# Exécuter tous les tests frontend
npm test

# Exécuter les tests avec couverture
npm run test:coverage
```

### Tests E2E avec Cypress
```bash
# Démarrer les tests E2E en mode headless
npm run cypress:run

# Ouvrir l'interface Cypress
npm run cypress:open
```

## Pipeline CI/CD

Notre pipeline CI/CD utilise GitHub Actions et comprend les étapes suivantes :

1. **Lint et Format** : Vérifie le style du code
2. **Tests Unitaires** : Exécute les tests backend et frontend
3. **Tests E2E** : Lance les tests Cypress
4. **Build** : Compile l'application
5. **Deploy** : Déploie sur l'environnement approprié

Le workflow est déclenché sur :
- Push sur main
- Pull requests vers main
- Tags (pour les releases)

## Couverture des Tests

Nous maintenons une couverture de tests minimale de :
- Backend : 80%
- Frontend : 75%
- E2E : Scénarios critiques couverts

Les rapports de couverture sont générés automatiquement dans le pipeline CI/CD.

## Bonnes Pratiques

### Tests Frontend
- Tests des composants isolés
- Tests d'intégration des pages
- Mock des appels API
- Test des événements utilisateur

### Tests Backend
- Tests unitaires des services
- Tests d'intégration des API
- Mock des dépendances externes
- Validation des schémas de données

## Documentation API

La documentation de l'API est disponible sur :
- Development : http://localhost:3000/api-docs
- Production : https://api.votredomaine.com/api-docs

## Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
